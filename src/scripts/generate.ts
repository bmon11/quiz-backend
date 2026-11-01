import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { type Drafted, norm, pool, shuffle, verify, wellFormed } from '../ai/quiz-tools';
import { bundles, generatedDir, readGenerated } from '../seed/data';
import { validateBundle } from '../seed/seed';
import type { GeneratedFile, L, SeedLesson, SeedQuestion } from '../seed/types';

// Gemini content generator. Writes src/seed/data/generated/<topic>.json, which
// `npm run seed` merges with the hand-written bundle. Review the diff before
// seeding — the fact-check pass drops what it can't confirm, not everything wrong.
//
//   npm run generate -- --topic gods --count 10            # 10 more per lesson
//   npm run generate -- --topic geography --new-lessons 3 --lesson new --count 8
//   npm run generate -- --topic pubquiz --lesson pubquiz.cinema --count 20 \
//       --source predicted --brief ../QUIZ-LEAGUE-ANALYSIS.md

const { values: args } = parseArgs({
  options: {
    topic: { type: 'string' },
    lesson: { type: 'string', default: 'all' },
    count: { type: 'string', default: '10' },
    'new-lessons': { type: 'string', default: '0' },
    source: { type: 'string' },
    brief: { type: 'string' },
    model: { type: 'string' },
    'no-verify': { type: 'boolean', default: false },
    concurrency: { type: 'string', default: '4' },
  },
});

const SYSTEM = `You write content for a bilingual (English + Mongolian) educational quiz app.
Rules:
- Facts must be mainstream and verifiable (Wikipedia-level). If sources disagree, avoid the fact or say so.
- Every string has "en" and "mn". Mongolian must be natural modern Cyrillic Mongolian as written by an educated native speaker — not a word-for-word translation. Use the established Mongolian spellings of names (Зевс, Афина, Достоевский, Лондон, Амазон мөрөн).
- Questions: exactly 4 choices, one clearly correct, three plausible but definitely wrong. No "all of the above". Choices are short (1–6 words).
- The explanation teaches the fact in 1–2 sentences and adds one interesting detail.
- Difficulty: 1 = most people know, 2 = needs the lesson, 3 = expert / tricky.`;

const L_SCHEMA = { type: 'object', properties: { en: { type: 'string' }, mn: { type: 'string' } }, required: ['en', 'mn'] };

const QUESTIONS_SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          prompt: L_SCHEMA,
          choices: { type: 'array', items: L_SCHEMA },
          answer: { type: 'integer', description: 'index of the correct choice, 0–3' },
          explanation: L_SCHEMA,
        },
        required: ['difficulty', 'prompt', 'choices', 'answer', 'explanation'],
      },
    },
  },
  required: ['questions'],
};

const LESSONS_SCHEMA = {
  type: 'object',
  properties: {
    lessons: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'short kebab-case id, e.g. "norse-links"' },
          title: L_SCHEMA,
          summary: L_SCHEMA,
          body: L_SCHEMA,
          visualKind: { type: 'string', enum: ['cards', 'timeline', 'bar'] },
          cards: {
            type: 'array',
            description: 'for visualKind=cards: 4–8 cards',
            items: {
              type: 'object',
              properties: { icon: { type: 'string', description: 'one emoji' }, title: L_SCHEMA, subtitle: L_SCHEMA, facts: { type: 'array', items: L_SCHEMA } },
              required: ['icon', 'title', 'facts'],
            },
          },
          timeline: {
            type: 'array',
            description: 'for visualKind=timeline: 5–9 events in order',
            items: { type: 'object', properties: { when: L_SCHEMA, title: L_SCHEMA, body: L_SCHEMA }, required: ['when', 'title', 'body'] },
          },
          bar: {
            type: 'object',
            description: 'for visualKind=bar: 5–10 ranked items with real numbers',
            properties: { unit: L_SCHEMA, items: { type: 'array', items: { type: 'object', properties: { label: L_SCHEMA, value: { type: 'number' } }, required: ['label', 'value'] } } },
          },
          funFacts: { type: 'array', items: L_SCHEMA },
        },
        required: ['slug', 'title', 'summary', 'body', 'visualKind', 'funFacts'],
      },
    },
  },
  required: ['lessons'],
};

/** Lesson as prompt context; the gods family visual is trimmed to names. */
const lessonContext = (l: SeedLesson) => {
  const visual =
    l.visual.kind === 'family'
      ? { kind: 'family', people: l.visual.people.map((p) => `${p.name.en} (${p.role.en})`) }
      : l.visual;
  return JSON.stringify({ title: l.title.en, body: l.body.en, visual, funFacts: l.funFacts.map((f) => f.en) });
};

async function draftLessons(topicTitle: string, existing: SeedLesson[], n: number, brief: string): Promise<SeedLesson[]> {
  const { lessons } = await generateJson<{ lessons: any[] }>({
    system: SYSTEM,
    model: args.model,
    prompt: `Topic: ${topicTitle}.
Existing lessons (do not repeat them): ${existing.map((l) => l.title.en).join('; ')}.
${brief}
Write ${n} NEW lessons that broaden this topic with well-known, quiz-worthy knowledge. Each lesson: a body of 2–4 sentences, one visual (cards for profiles/lists, timeline for stories, bar only with real numbers), and 2–3 fun facts.`,
    schema: LESSONS_SCHEMA,
  });
  const slug = args.topic!;
  const maxOrder = Math.max(0, ...existing.map((l) => l.order));
  return lessons.slice(0, n).map((d, i) => {
    const visual =
      d.visualKind === 'timeline' && d.timeline?.length
        ? { kind: 'timeline' as const, items: d.timeline }
        : d.visualKind === 'bar' && d.bar?.items?.length
          ? { kind: 'bar' as const, unit: d.bar.unit ?? { en: '', mn: '' }, horizontal: true, items: d.bar.items }
          : { kind: 'cards' as const, items: (d.cards ?? []).map((c: any) => ({ ...c, subtitle: c.subtitle?.en ? c.subtitle : undefined })) };
    return {
      topicSlug: slug,
      key: `${slug}.${norm(d.slug).replace(/ /g, '-')}`,
      order: maxOrder + i + 1,
      title: d.title,
      summary: d.summary,
      body: d.body,
      visual,
      funFacts: d.funFacts ?? [],
    };
  });
}

async function draftQuestions(lesson: SeedLesson, avoid: string[], n: number, brief: string): Promise<Drafted[]> {
  const { questions } = await generateJson<{ questions: Drafted[] }>({
    system: SYSTEM,
    model: args.model,
    prompt: `Lesson: ${lessonContext(lesson)}
${brief}
Questions that already exist — do NOT repeat or rephrase them:
${avoid.slice(-120).map((p) => `- ${p}`).join('\n')}

Write ${n} new questions for this lesson. Go beyond the lesson text into related well-known facts on the same subject. Mix difficulties (about 30% level 1, 45% level 2, 25% level 3). Vary the question forms (which/who/where/how many/which is NOT/odd one out).`,
    schema: QUESTIONS_SCHEMA,
  });
  return questions.filter(wellFormed);
}

async function run() {
  const slug = args.topic;
  const arranged = bundles.find((b) => b.topic.slug === slug);
  if (!arranged) throw new Error(`--topic must be one of: ${bundles.map((b) => b.topic.slug).join(', ')}`);
  const count = Number(args.count);
  const source = args.source as SeedQuestion['source'];
  if (source && source !== 'show' && source !== 'predicted') throw new Error('--source must be show | predicted');
  const brief = args.brief
    ? `Style guide — write in the style these quiz masters use:\n${fs.readFileSync(path.resolve(args.brief), 'utf8').slice(0, 20_000)}`
    : '';

  const generated: GeneratedFile = readGenerated(slug!);
  // The arranged bundle already holds this topic's generated rows; keep them only in `generated`.
  const genLessons = new Set(generated.lessons.map((l) => l.key));
  const genQuestions = new Set(generated.questions.map((q) => q.key));
  const base = {
    ...arranged,
    lessons: arranged.lessons.filter((l) => !genLessons.has(l.key)),
    questions: arranged.questions.filter((q) => !genQuestions.has(q.key)),
  };
  const allLessons = () => [...base.lessons, ...generated.lessons];
  const allQuestions = () => [...base.questions, ...generated.questions];
  const save = () => {
    fs.mkdirSync(generatedDir, { recursive: true });
    fs.writeFileSync(path.join(generatedDir, `${slug}.json`), `${JSON.stringify(generated, null, 2)}\n`);
  };

  console.log(`Model ${args.model ?? defaultModel()} · topic ${slug}`);

  const newLessons = Number(args['new-lessons']);
  let targets: SeedLesson[] = [];
  if (newLessons > 0) {
    const drafted = (await draftLessons(base.topic.title.en, allLessons(), newLessons, brief)).filter(
      (l) => !allLessons().some((x) => x.key === l.key)
    );
    generated.lessons.push(...drafted);
    targets = drafted;
    console.log(`  + ${drafted.length} lessons: ${drafted.map((l) => l.title.en).join(', ')}`);
    save();
  }
  // --lesson all (default) | new (only the lessons drafted this run) | key,key
  if (args.lesson === 'all') targets = allLessons();
  else if (args.lesson !== 'new') {
    const wanted = args.lesson!.split(',');
    targets = [...targets, ...allLessons().filter((l) => wanted.includes(l.key))];
    if (!targets.length) throw new Error(`No lesson ${args.lesson}`);
  }

  const seen = new Set(allQuestions().map((q) => norm(q.prompt.en)));
  await pool(targets, Number(args.concurrency), async (lesson) => {
    const avoid = allQuestions().filter((q) => q.lessonKey === lesson.key).map((q) => q.prompt.en);
    let drafts = (await draftQuestions(lesson, avoid, count, brief)).filter((q) => !seen.has(norm(q.prompt.en)));
    const drafted = drafts.length;
    if (!args['no-verify']) drafts = await verify(drafts, lesson.title.en, args.model);
    const taken = new Set(allQuestions().map((q) => q.key));
    let n = 0;
    for (const d of drafts.map(shuffle)) {
      seen.add(norm(d.prompt.en));
      let key: string;
      do key = `${lesson.key}.g${++n}`;
      while (taken.has(key));
      taken.add(key);
      generated.questions.push({ topicSlug: slug!, lessonKey: lesson.key, key, ...d, ...(source && { source }) });
    }
    console.log(`  ✓ ${lesson.key}: kept ${drafts.length}/${drafted}`);
    save();
  });

  const errors = validateBundle({ ...base, lessons: allLessons(), questions: allQuestions() });
  if (errors.length) throw new Error(`Generated content is invalid:\n  ${errors.join('\n  ')}`);
  save();
  // gemini-3.5-flash list price (USD per 1M tokens); search grounding is billed separately.
  const cost = (usage.inputTokens * 0.5 + usage.outputTokens * 3) / 1e6;
  console.log(`Done: ${generated.lessons.length} generated lessons, ${generated.questions.length} generated questions in total.`);
  console.log(`Gemini: ${usage.calls} calls, ${usage.inputTokens} in / ${usage.outputTokens} out tokens ≈ $${cost.toFixed(2)} (+ search)`);
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
