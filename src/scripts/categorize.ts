import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { categoriesFile, handWritten, rawContent } from '../seed/data';
import type { Categories, SeedTopic } from '../seed/types';

// Gemini re-arranges the lessons into categories. Writes
// src/seed/data/categories.json (new topics + lessonKey → topic slug), which
// `npm run seed` applies; question keys never change, so answer stats survive.
// Review the file before seeding.
//
//   npm run categorize                 # propose a new arrangement
//   npm run categorize -- --min 10 --max 14

const { values: args } = parseArgs({
  options: {
    min: { type: 'string', default: '10' },
    max: { type: 'string', default: '14' },
    model: { type: 'string' },
  },
});

const L_SCHEMA = { type: 'object', properties: { en: { type: 'string' }, mn: { type: 'string' } }, required: ['en', 'mn'] };

const SCHEMA = {
  type: 'object',
  properties: {
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'short lowercase id; reuse an existing slug when the category is the same subject' },
          title: L_SCHEMA,
          tagline: L_SCHEMA,
          description: L_SCHEMA,
          icon: { type: 'string', description: 'iconify name from the Solar set, e.g. "solar:film-bold-duotone"' },
          color: { type: 'string', description: 'hex accent colour, distinct from the others' },
          lessons: { type: 'array', items: { type: 'string' }, description: 'lesson keys in reading order' },
          missing: {
            type: 'array',
            items: { type: 'string' },
            description: 'up to 4 lesson subjects (English titles) this category still lacks to feel complete',
          },
        },
        required: ['slug', 'title', 'tagline', 'description', 'icon', 'color', 'lessons', 'missing'],
      },
    },
    rationale: { type: 'string' },
  },
  required: ['categories', 'rationale'],
};

type Proposed = SeedTopic & { lessons: string[]; missing: string[] };

async function run() {
  const { lessons, questions } = rawContent();
  const listing = lessons
    .map((l) => {
      const samples = questions.filter((q) => q.lessonKey === l.key).slice(0, 4).map((q) => q.prompt.en);
      const n = questions.filter((q) => q.lessonKey === l.key).length;
      return `- ${l.key} [now: ${l.topicSlug}, ${n} q, visual ${l.visual.kind}] ${l.title.en} — ${l.summary.en}\n    e.g. ${samples.join(' / ')}`;
    })
    .join('\n');
  const current = handWritten.map((b) => `${b.topic.slug} = ${b.topic.title.en}`).join('; ');

  console.log(`Model ${args.model ?? defaultModel()} · ${lessons.length} lessons`);
  const res = await generateJson<{ categories: Proposed[]; rationale: string }>({
    model: args.model,
    temperature: 0.3,
    system: `You are the editor of a bilingual (English + Mongolian) trivia-learning app for Mongolian adults preparing for pub quizzes.
Mongolian strings must be natural modern Cyrillic Mongolian (noun-phrase titles, no "-аарай"/"-на уу" imperatives).`,
    prompt: `The app has only these categories: ${current}. "General Trivia" (pubquiz) became a catch-all.
Re-arrange ALL lessons below into ${args.min}–${args.max} categories a player would browse on the home screen.
Rules:
- Every lesson key appears in exactly one category. Do not invent lesson keys.
- Keep the slugs gods, geography, space, astrology for those subjects (their lessons have special visuals). Mythology lessons from trivia may join gods; place/country lessons may join geography; space-race lessons may join space.
- Each category has at least 3 lessons. Order lessons from basics to harder.
- New slugs are short lowercase English words (history, cinema, science…).
- Title: 1–3 words. Tagline: one short line. Description: 1–2 sentences.
- "missing": lesson subjects that would round the category out (they will be generated later).

Lessons:
${listing}`,
    schema: SCHEMA,
  });

  const keys = new Set(lessons.map((l) => l.key));
  const seen = new Map<string, string>();
  const errors: string[] = [];
  for (const c of res.categories) {
    for (const k of c.lessons) {
      if (!keys.has(k)) errors.push(`unknown lesson ${k} in ${c.slug}`);
      else if (seen.has(k)) errors.push(`${k} in both ${seen.get(k)} and ${c.slug}`);
      else seen.set(k, c.slug);
    }
  }
  // A lesson the model forgot stays in its own category when that still exists.
  for (const l of lessons) {
    if (seen.has(l.key)) continue;
    const home = res.categories.find((c) => c.slug === l.topicSlug);
    if (home) {
      home.lessons.push(l.key);
      seen.set(l.key, home.slug);
      console.log(`  (kept ${l.key} in ${home.slug})`);
    } else errors.push(`${l.key} not assigned`);
  }
  if (errors.length) throw new Error(`Gemini arrangement is invalid:\n  ${errors.join('\n  ')}`);

  const out: Categories = {
    rationale: res.rationale,
    topics: res.categories.map((c, i) => {
      const base = handWritten.find((b) => b.topic.slug === c.slug)?.topic;
      return {
        // Hand-written topics keep their own look (stars effect etc.); only the order changes.
        topic: base
          ? { ...base, order: i + 1 }
          : { slug: c.slug, order: i + 1, color: c.color, icon: c.icon, title: c.title, tagline: c.tagline, description: c.description },
        lessons: c.lessons,
        missing: c.missing,
      };
    }),
  };
  fs.writeFileSync(categoriesFile, `${JSON.stringify(out, null, 2)}\n`);

  for (const t of out.topics) console.log(`  ${t.topic.order}. ${t.topic.slug} — ${t.topic.title.en} / ${t.topic.title.mn}: ${t.lessons.length} lessons; missing: ${(t.missing ?? []).join(', ')}`);
  console.log(`\n${res.rationale}`);
  const cost = (usage.inputTokens * 0.5 + usage.outputTokens * 3) / 1e6;
  console.log(`Gemini: ${usage.calls} calls ≈ $${cost.toFixed(2)}`);
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
