import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { type Drafted, norm, pool, shuffle, verify, wellFormed } from '../ai/quiz-tools';
import { bundles, extraDir } from '../seed/data';
import type { GeneratedFile, L, SeedLesson } from '../seed/types';

// Imports a quiz master's question document (plain text, e.g. `pdftotext -layout`
// of the Google Doc): Gemini drops picture/news/dated questions, rewrites the
// rest as bilingual 4-choice questions filed under the best category + lesson,
// and the grounded fact-check keeps only what it confirms. Questions that fit
// no lesson go to a per-category "Quiz League questions" lesson. Output:
// src/seed/data/extra/<name>.json (source: 'show'); re-running skips games
// already imported.
//
//   pdftotext -layout doc.pdf doc.txt
//   npm run import:doc -- --file doc.txt --name erkhes

const { values: args } = parseArgs({
  options: {
    file: { type: 'string' },
    name: { type: 'string', default: 'doc' },
    games: { type: 'string', description: 'only the first N games (try a small run first)' },
    concurrency: { type: 'string', default: '4' },
    model: { type: 'string' },
  },
});

const L_SCHEMA = { type: 'object', properties: { en: { type: 'string' }, mn: { type: 'string' } }, required: ['en', 'mn'] };

const SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          original: { type: 'string', description: 'the source question, verbatim, shortened to 120 characters' },
          keep: { type: 'boolean' },
          skipReason: { type: 'string', description: 'when keep=false: image | news | dated | ambiguous | other' },
          lessonKey: { type: 'string', description: 'one of the lesson keys listed, or "<category slug>.quiz-league" when no lesson fits' },
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          prompt: L_SCHEMA,
          choices: { type: 'array', items: L_SCHEMA },
          answer: { type: 'integer', description: 'index of the correct choice, 0–3' },
          explanation: L_SCHEMA,
        },
        required: ['original', 'keep'],
      },
    },
  },
  required: ['questions'],
};

const CARDS_SCHEMA = {
  type: 'object',
  properties: {
    summary: L_SCHEMA,
    body: L_SCHEMA,
    cards: {
      type: 'array',
      items: { type: 'object', properties: { icon: { type: 'string' }, title: L_SCHEMA, facts: { type: 'array', items: L_SCHEMA } }, required: ['icon', 'title', 'facts'] },
    },
    funFacts: { type: 'array', items: L_SCHEMA },
  },
  required: ['summary', 'body', 'cards', 'funFacts'],
};

const SYSTEM = `You turn a Mongolian pub-quiz host's question sheets into questions for a bilingual (English + Mongolian) trivia-learning app.
For every numbered question in the sheet return one item, in order.
keep=false when the question:
- needs a picture, video, audio or a slide ("зурагт", "энэ зураг", "постер нь харагдаж", "дууг сонсоод", rounds that are just a list of options under a picture prompt) → image
- is about that week's news, an upcoming event, a schedule, "энэ 7 хоног", "өчигдөр", or a fact only true on the game date → news / dated
- has no single defensible answer, is a points-per-item round, or the answer is missing → ambiguous
keep=true otherwise, and then:
- prompt: keep the host's clever style (ТЭР / ҮҮНИЙГ clues) in natural modern Mongolian; English is a faithful natural translation. Add context so it reads on its own (a year instead of "this year").
- exactly 4 choices: the host's answer plus 3 plausible wrong ones of the same kind (if the host listed options, use them). Choices short.
- explanation: 1–2 sentences teaching the fact, in both languages.
- Fix obvious typos in the source. Use established Mongolian spellings of names.
- lessonKey: the most specific matching lesson; "<slug>.quiz-league" only when no lesson fits.
- difficulty: 1 easy, 2 medium, 3 hard (most pub-quiz questions are 2–3).`;

type Item = Drafted & { original: string; keep: boolean; skipReason?: string; lessonKey?: string };

/** Splits the document into games at the date lines ("2022.04.21"). */
const games = (text: string) => {
  const out: { date: string; text: string }[] = [];
  for (const part of text.split(/^(?=\s*20\d{2}\.\d{2}\.\d{2}\s*$)/m)) {
    const date = part.match(/20\d{2}\.\d{2}\.\d{2}/)?.[0];
    if (!date || part.trim().length <= 40) continue;
    // Two games on one date (rare) get a suffix so question keys stay unique.
    const base = date.replace(/\./g, '');
    const id = out.some((g) => g.date === base) ? `${base}b` : base;
    out.push({ date: id, text: part.replace(/\n{3,}/g, '\n\n').trim() });
  }
  return out;
};

async function run() {
  if (!args.file) throw new Error('--file <doc.txt> is required');
  const outFile = path.join(extraDir, `${args.name}.json`);
  const out: GeneratedFile = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : { lessons: [], questions: [] };
  const save = () => fs.writeFileSync(outFile, `${JSON.stringify(out, null, 2)}\n`);

  const lessonTopic = new Map<string, string>();
  for (const b of bundles) for (const l of b.lessons) lessonTopic.set(l.key, b.topic.slug);
  const catalog = bundles
    .map((b) => `## ${b.topic.slug} — ${b.topic.title.en} / ${b.topic.title.mn}\n${b.lessons.map((l) => `- ${l.key}: ${l.title.en}`).join('\n')}`)
    .join('\n');
  const slugs = new Set(bundles.map((b) => b.topic.slug));
  const seen = new Set(bundles.flatMap((b) => b.questions.map((q) => norm(q.prompt.en))));
  for (const q of out.questions) seen.add(norm(q.prompt.en));

  const done = new Set(out.questions.map((q) => q.key.split('.')[1]));
  let todo = games(fs.readFileSync(path.resolve(args.file), 'utf8')).filter((g) => !done.has(g.date));
  if (args.games) todo = todo.slice(0, Number(args.games));
  console.log(`Model ${args.model ?? defaultModel()} · ${todo.length} games to import`);

  const skipped: Record<string, number> = {};
  const failed: string[] = [];
  await pool(todo, Number(args.concurrency), async (game) => {
    try {
      await importGame(game);
    } catch (err) {
      // Re-running the script picks the game up again.
      failed.push(game.date);
      console.log(`  ✗ ${game.date}: ${(err as Error).message}`);
    }
  });

  async function importGame(game: { date: string; text: string }) {
    const { questions } = await generateJson<{ questions: Item[] }>({
      system: SYSTEM,
      model: args.model,
      temperature: 0.4,
      maxOutputTokens: 60_000,
      prompt: `Categories and lessons:\n${catalog}\n\nQuestion sheet of the game on ${game.date}:\n${game.text}`,
      schema: SCHEMA,
    });
    for (const q of questions) if (!q.keep) skipped[q.skipReason ?? 'other'] = (skipped[q.skipReason ?? 'other'] ?? 0) + 1;
    const routed = questions
      .filter((q) => q.keep && wellFormed(q))
      .map((q) => {
        const key = q.lessonKey ?? '';
        if (lessonTopic.has(key)) return q;
        const slug = key.split('.')[0];
        return { ...q, lessonKey: `${slugs.has(slug) ? slug : 'brainteasers'}.quiz-league` };
      })
      .filter((q) => !seen.has(norm(q.prompt.en)));
    const kept = await verify(routed, `Pub quiz game ${game.date}`, args.model);
    let n = 0;
    for (const q of kept) {
      seen.add(norm(q.prompt.en));
      const { original: _o, keep: _k, skipReason: _s, lessonKey, ...d } = q as Item;
      const lk = lessonKey!;
      out.questions.push({ topicSlug: lessonTopic.get(lk) ?? lk.split('.')[0], lessonKey: lk, key: `show.${game.date}.${++n}`, ...shuffle(d as Drafted), source: 'show' });
    }
    console.log(`  ✓ ${game.date}: ${questions.length} in sheet → ${routed.length} usable → kept ${kept.length}`);
    save();
  }
  if (failed.length) console.log(`Failed games (re-run to retry): ${failed.join(', ')}`);

  // One "Quiz League questions" lesson per category that got unmatched questions.
  const fallback = [...new Set(out.questions.map((q) => q.lessonKey).filter((k) => k.endsWith('.quiz-league')))];
  for (const key of fallback) {
    if (out.lessons.some((l) => l.key === key)) continue;
    const slug = key.split('.')[0];
    const topic = bundles.find((b) => b.topic.slug === slug)!.topic;
    const qs = out.questions.filter((q) => q.lessonKey === key);
    const d = await generateJson<{ summary: L; body: L; cards: { icon: string; title: L; facts: L[] }[]; funFacts: L[] }>({
      system: SYSTEM,
      model: args.model,
      prompt: `Write a short lesson that teaches the facts behind these real pub-quiz questions in the category "${topic.title.en}": a one-sentence summary, a 2–3 sentence body, 4–6 cards (one emoji icon, a title, 2–3 facts each) grouping the facts by theme, and 2–3 fun facts.\n${qs.map((q) => `- ${q.prompt.en} → ${q.choices[q.answer].en}`).join('\n')}`,
      schema: CARDS_SCHEMA,
    });
    const lesson: SeedLesson = {
      topicSlug: slug,
      key,
      order: 999,
      title: { en: 'Quiz League questions', mn: 'Тэмцээний асуултууд' },
      summary: d.summary,
      body: d.body,
      visual: { kind: 'cards', items: d.cards },
      funFacts: d.funFacts,
    };
    out.lessons.push(lesson);
    console.log(`  + lesson ${key} (${qs.length} questions)`);
    save();
  }

  const byTopic: Record<string, number> = {};
  for (const q of out.questions) byTopic[q.topicSlug] = (byTopic[q.topicSlug] ?? 0) + 1;
  console.log(`Done: ${out.questions.length} questions in ${path.relative(process.cwd(), outFile)}`, byTopic);
  console.log('Skipped by the converter:', skipped);
  const cost = (usage.inputTokens * 0.5 + usage.outputTokens * 3) / 1e6;
  console.log(`Gemini: ${usage.calls} calls, ${usage.inputTokens} in / ${usage.outputTokens} out tokens ≈ $${cost.toFixed(2)} (+ search)`);
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
