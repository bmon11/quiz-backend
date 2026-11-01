import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { pool } from '../ai/quiz-tools';
import { expansionsFile, readExpansions, rawLessons } from '../seed/data';
import type { Expansion, L, SeedLesson, Visual } from '../seed/types';

// Gemini completes thin lesson visuals: a lesson titled "The nine districts"
// must show all nine, an open-ended list grows to the 8–12 most quiz-worthy
// items. Existing items are kept; new ones pass a grounded fact-check.
// Writes src/seed/data/expansions.json (lessonKey → full visual + funFacts),
// which the seed overlays on the lesson. Review the diff, then `npm run seed`.
//
//   npm run expand                          # every lesson with < 8 items
//   npm run expand -- --lesson ulaanbaatar.the-nine-districts --force
//   npm run expand -- --min 10 --dry

const { values: args } = parseArgs({
  options: {
    lesson: { type: 'string' },
    min: { type: 'string', default: '8' },
    force: { type: 'boolean', default: false },
    dry: { type: 'boolean', default: false },
    model: { type: 'string' },
    concurrency: { type: 'string', default: '4' },
  },
});

type Kind = 'cards' | 'timeline' | 'bar' | 'donut' | 'pairs';
const KINDS: Kind[] = ['cards', 'timeline', 'bar', 'donut', 'pairs'];

const L_SCHEMA = { type: 'object', properties: { en: { type: 'string' }, mn: { type: 'string' } }, required: ['en', 'mn'] };

const ITEM_SCHEMA: Record<Kind, object> = {
  cards: {
    type: 'object',
    properties: {
      icon: { type: 'string', description: 'one emoji' },
      title: L_SCHEMA,
      subtitle: L_SCHEMA,
      facts: { type: 'array', items: L_SCHEMA, description: '2–3 concrete, quiz-worthy facts' },
    },
    required: ['icon', 'title', 'subtitle', 'facts'],
  },
  timeline: {
    type: 'object',
    properties: { when: L_SCHEMA, title: L_SCHEMA, body: L_SCHEMA },
    required: ['when', 'title', 'body'],
  },
  bar: {
    type: 'object',
    properties: { label: L_SCHEMA, value: { type: 'number' }, note: L_SCHEMA },
    required: ['label', 'value'],
  },
  donut: {
    type: 'object',
    properties: { label: L_SCHEMA, value: { type: 'number' }, note: L_SCHEMA },
    required: ['label', 'value'],
  },
  pairs: {
    type: 'object',
    properties: { left: L_SCHEMA, right: L_SCHEMA, note: L_SCHEMA },
    required: ['left', 'right'],
  },
};

const schemaFor = (kind: Kind) => ({
  type: 'object',
  properties: {
    closedSet: { type: 'integer', description: 'size of the complete set the lesson names (9 districts → 9), 0 when open-ended' },
    items: { type: 'array', items: ITEM_SCHEMA[kind] },
    funFacts: { type: 'array', items: L_SCHEMA, description: '3–5 "did you know" one-liners' },
  },
  required: ['closedSet', 'items', 'funFacts'],
});

const SYSTEM = `You complete lessons in a bilingual (English + Mongolian) trivia-learning app for Mongolian adults.
Rules:
- Facts must be mainstream and verifiable (Wikipedia-level), current as of today. Use Google Search to confirm names, dates and numbers.
- Every string has "en" and "mn". Mongolian must be natural modern Cyrillic Mongolian as written by an educated native speaker — not a word-for-word translation. Use established Mongolian spellings of names. Titles are noun phrases; never use "-аарай"/"-на уу" imperatives.
- Keep the voice, length and style of the existing items.`;

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: { index: { type: 'integer' }, ok: { type: 'boolean' }, reason: { type: 'string' } },
        required: ['index', 'ok', 'reason'],
      },
    },
  },
  required: ['results'],
};

type AnyItem = Record<string, any>;

const itemsOf = (v: Visual): AnyItem[] => ('items' in v ? (v.items as AnyItem[]) : []);
const labelOf = (it: AnyItem) => (it.title ?? it.label ?? it.left)?.en ?? '';
const key = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const filled = (l?: L) => Boolean(l?.en?.trim() && l?.mn?.trim());

const tidy = (kind: Kind, it: AnyItem): AnyItem => {
  const out = { ...it };
  for (const f of ['subtitle', 'note']) if (f in out && !filled(out[f])) delete out[f];
  if (kind === 'cards') out.facts = (out.facts ?? []).filter(filled);
  return out;
};

const wellFormed = (kind: Kind, it: AnyItem) => {
  if (kind === 'cards') return filled(it.title) && it.facts?.length > 0;
  if (kind === 'timeline') return filled(it.when) && filled(it.title) && filled(it.body);
  if (kind === 'pairs') return filled(it.left) && filled(it.right);
  return filled(it.label) && Number.isFinite(it.value);
};

/** Rejected items' reasons land in `rejected` so a retry can fix them. */
async function verifyNew(lesson: SeedLesson, kind: Kind, items: AnyItem[], rejected: string[] = []): Promise<AnyItem[]> {
  if (!items.length) return [];
  const listing = items.map((it, i) => `#${i} ${JSON.stringify(it)}`).join('\n');
  try {
    const { results } = await generateJson<{ results: { index: number; ok: boolean; reason: string }[] }>({
      model: args.model,
      system:
        'You are a strict fact-checker for a quiz app. Use Google Search. Mark ok=false for any item with a wrong or doubtful name, date, number or fact, or a wrong / unnatural Mongolian translation.',
      prompt: `Lesson: ${lesson.title.en} — ${lesson.body.en}\nVisual kind: ${kind}\nCheck each new item:\n${listing}`,
      schema: VERIFY_SCHEMA,
      search: true,
      temperature: 0,
    });
    return items.filter((it, i) => {
      const r = results.find((x) => x.index === i);
      if (!r?.ok) {
        console.log(`    ✗ ${lesson.key}: dropped "${labelOf(it)}" — ${r?.reason ?? 'not checked'}`);
        rejected.push(`"${labelOf(it)}": ${r?.reason ?? 'not checked'}`);
      }
      return r?.ok;
    });
  } catch (err) {
    if (items.length <= 2) {
      console.log(`    ✗ ${lesson.key}: ${items.length} unchecked dropped — ${(err as Error).message}`);
      return [];
    }
    const mid = Math.ceil(items.length / 2);
    return [
      ...(await verifyNew(lesson, kind, items.slice(0, mid), rejected)),
      ...(await verifyNew(lesson, kind, items.slice(mid), rejected)),
    ];
  }
}

const draft = (lesson: SeedLesson, kind: Kind, current: AnyItem[], rejected: string[]) =>
  generateJson<{ closedSet: number; items: AnyItem[]; funFacts: L[] }>({
    model: args.model,
    system: SYSTEM,
    search: true,
    temperature: 0.4,
    prompt: `Lesson "${lesson.title.en}" / «${lesson.title.mn}»
Body: ${lesson.body.en}
Visual kind: ${kind}${'unit' in lesson.visual ? ` (unit: ${lesson.visual.unit.en})` : ''}
Current items (${current.length}): ${JSON.stringify(current)}
Current fun facts: ${JSON.stringify(lesson.funFacts)}

The visual is incomplete. Return the COMPLETE item list:
- If the title or body names a closed set (e.g. "nine districts", "seven continents", "21 aimags"), return every member — exactly that many.
- Otherwise return the 8–12 most important, quiz-worthy items for this lesson.
- Start with the current items (fix one only if it is factually wrong), then add the missing ones${kind === 'timeline' ? '; keep chronological order' : kind === 'bar' ? '; keep the same unit and rank by value, largest first' : ''}.
- Fun facts: keep the current ones and add new ones so there are 3–5, none repeating the items.${
      rejected.length ? `\n\nA fact-checker rejected these earlier drafts — rewrite them without the errors:\n${rejected.join('\n')}` : ''
    }`,
    schema: schemaFor(kind),
  });

async function expand(lesson: SeedLesson): Promise<Expansion | null> {
  const kind = lesson.visual.kind as Kind;
  const original = itemsOf(lesson.visual);
  let items = [...original];
  let closedSet = 0;
  let drafted: AnyItem[] = [];
  let fun: L[] = [];
  const rejected: string[] = [];
  // A closed set ("nine districts") gets up to two retries for the members the fact-check dropped.
  for (let round = 0; round < 3; round++) {
    const res = await draft(lesson, kind, items, rejected.splice(0));
    closedSet = res.closedSet > 0 ? res.closedSet : 0;
    if (!fun.length) fun = res.funFacts ?? [];
    drafted = (res.items ?? []).map((it) => tidy(kind, it)).filter((it) => wellFormed(kind, it));
    const seen = new Set(items.map((it) => key(labelOf(it))));
    // The model may rewrite an existing item; keep the original (and its image/colour).
    const fresh = drafted.filter((it) => !seen.has(key(labelOf(it))));
    items = [...items, ...(await verifyNew(lesson, kind, fresh, rejected))];
    if (!closedSet || items.length >= closedSet || !rejected.length) break;
  }
  if (closedSet && items.length > closedSet) items = items.slice(0, closedSet);
  if (kind === 'bar') items = items.sort((a, b) => b.value - a.value);
  if (kind === 'timeline') {
    const order = new Map(drafted.map((it, i) => [key(labelOf(it)), i]));
    items = items.sort((a, b) => (order.get(key(labelOf(a))) ?? 0) - (order.get(key(labelOf(b))) ?? 0));
  }
  const current = original;
  const res = { closedSet, funFacts: fun };
  const funKeys = new Set(lesson.funFacts.map((f) => key(f.en)));
  const funFacts = [...lesson.funFacts, ...(res.funFacts ?? []).filter((f) => filled(f) && !funKeys.has(key(f.en)))].slice(0, 6);

  const set = res.closedSet > 0 ? ` (set of ${res.closedSet}${items.length !== res.closedSet ? ' ⚠ incomplete' : ''})` : '';
  console.log(`  ✓ ${lesson.key}: ${current.length} → ${items.length} items${set}, ${funFacts.length} fun facts`);
  if (items.length === current.length && funFacts.length === lesson.funFacts.length) return null;
  return { visual: { ...lesson.visual, items } as Visual, funFacts };
}

async function run() {
  const all = rawLessons();
  const done = readExpansions();
  const min = Number(args.min);
  const todo = all.filter((l) => {
    if (!KINDS.includes(l.visual.kind as Kind)) return false;
    if (args.lesson) return l.key === args.lesson;
    if (done[l.key] && !args.force) return false;
    return itemsOf(l.visual).length < min;
  });
  console.log(`Model ${args.model ?? defaultModel()} · ${todo.length} lessons to expand`);
  if (args.dry) {
    for (const l of todo) console.log(`  ${l.key} (${l.visual.kind}, ${itemsOf(l.visual).length})`);
    return;
  }

  const out = { ...done };
  await pool(todo, Number(args.concurrency), async (lesson) => {
    try {
      const exp = await expand(lesson);
      if (!exp) return;
      out[lesson.key] = exp;
      // Written after every lesson so an interrupted run keeps its work.
      fs.writeFileSync(expansionsFile, `${JSON.stringify(out, null, 2)}\n`);
    } catch (err) {
      console.log(`  ✗ ${lesson.key}: ${(err as Error).message}`);
    }
  });
  console.log(`Done · ${usage.calls} calls · ${usage.inputTokens} in / ${usage.outputTokens} out tokens`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
