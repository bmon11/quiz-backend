import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { pool } from '../ai/quiz-tools';
import { expansionsFile, readExpansions, rawLessons } from '../seed/data';
import type { Expansion, L, SeedLesson, Visual } from '../seed/types';

// Gemini completes thin lesson visuals: a lesson titled "The nine districts"
// must show all nine, an open-ended list grows in rounds of `--batch` new items
// until it holds `--min` (80). Existing items are kept; new ones pass a
// grounded fact-check, and a subject with fewer notable items stops short
// rather than padding. Writes src/seed/data/expansions.json (lessonKey → full
// visual + funFacts), which the seed overlays on the lesson. Review the diff,
// then `npm run images` (pictures for new cards) and `npm run seed`.
//
//   npm run expand                          # every lesson with < 80 items
//   npm run expand -- --lesson ulaanbaatar.the-nine-districts --force
//   npm run expand -- --min 40 --dry

const { values: args } = parseArgs({
  options: {
    lesson: { type: 'string' },
    min: { type: 'string', default: '80' },
    batch: { type: 'string', default: '20' },
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
      wiki: { type: 'string', description: 'exact English Wikipedia article title of this very thing, "" if none' },
    },
    required: ['icon', 'title', 'subtitle', 'facts', 'wiki'],
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
    items: { type: 'array', items: ITEM_SCHEMA[kind], description: 'only NEW items, not already listed' },
    funFacts: { type: 'array', items: L_SCHEMA, description: '"did you know" one-liners to add (may be empty)' },
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

const draft = (lesson: SeedLesson, kind: Kind, current: AnyItem[], want: number, needFun: boolean, rejected: string[]) =>
  generateJson<{ closedSet: number; items: AnyItem[]; funFacts: L[] }>({
    model: args.model,
    system: SYSTEM,
    search: true,
    temperature: 0.4,
    prompt: `Lesson "${lesson.title.en}" / «${lesson.title.mn}»
Body: ${lesson.body.en}
Visual kind: ${kind}${'unit' in lesson.visual && lesson.visual.unit ? ` (unit: ${lesson.visual.unit.en})` : ''}
Example items (match their style and length): ${JSON.stringify(current.slice(0, 2))}
Already listed (${current.length}) — do not repeat any of these: ${current.map(labelOf).join(' | ')}

Add NEW items to this visual:
- If the title or body names a closed set (e.g. "nine districts", "seven continents", "21 aimags"), set closedSet to its size and return only the members still missing.
- Otherwise set closedSet to 0 and return exactly ${want} new items: the next most important, quiz-worthy ones for this lesson (the lesson is building toward ${Number(args.min)} items, so well-known second-tier entries are welcome). Return fewer only when the subject truly has no more notable, verifiable items. Never invent entries or repeat one under another name.${
      kind === 'bar' ? '\n- Same unit as the existing items, real current values.' : ''
    }
- Fun facts: ${needFun ? 'add new ones so there are 3–5 in total, none repeating the items' : 'return []'}. Current: ${JSON.stringify(lesson.funFacts)}${
      rejected.length ? `\n\nA fact-checker rejected these earlier drafts — rewrite them without the errors or leave them out:\n${rejected.join('\n')}` : ''
    }`,
    schema: schemaFor(kind),
    maxOutputTokens: 48_000,
  });

const ORDER_SCHEMA = {
  type: 'object',
  properties: { order: { type: 'array', items: { type: 'integer' } } },
  required: ['order'],
};

/** Timeline items arrive in batches; one cheap call puts them in date order. */
async function chronological(items: AnyItem[]): Promise<AnyItem[]> {
  try {
    const { order } = await generateJson<{ order: number[] }>({
      model: args.model,
      system: 'You sort timeline events chronologically, oldest first.',
      prompt: `Return every index once, in chronological order:\n${items.map((it, i) => `#${i} ${it.when?.en}: ${it.title?.en}`).join('\n')}`,
      schema: ORDER_SCHEMA,
      temperature: 0,
    });
    const seen = new Set<number>();
    const sorted = order.filter((i) => items[i] && !seen.has(i) && seen.add(i)).map((i) => items[i]);
    return [...sorted, ...items.filter((_, i) => !seen.has(i))];
  } catch {
    return items;
  }
}

async function expand(lesson: SeedLesson, prev: Expansion | undefined, save: (exp: Expansion) => void): Promise<void> {
  const kind = lesson.visual.kind as Kind;
  const target = Number(args.min);
  const batch = Number(args.batch);
  const original = itemsOf(lesson.visual);
  let items = [...original];
  let closedSet = prev?.closedSet ?? 0;
  let funFacts = lesson.funFacts;
  const rejected: string[] = [];
  // Up to 2 rounds that add nothing in a row ends an open list; a closed set gets 3 tries.
  let idle = 0;
  for (let round = 0; round < 30; round++) {
    const goal = closedSet || target;
    if (items.length >= goal) break;
    const res = await draft(lesson, kind, items, Math.min(batch, goal - items.length), funFacts.length < 3, rejected.splice(0));
    if (res.closedSet > 0) closedSet = res.closedSet;
    const funKeys = new Set(funFacts.map((f) => key(f.en)));
    funFacts = [...funFacts, ...(res.funFacts ?? []).filter((f) => filled(f) && !funKeys.has(key(f.en)))].slice(0, 6);
    const seen = new Set(items.map((it) => key(labelOf(it))));
    // The model may rewrite an existing item; keep the original (and its image/colour).
    const fresh = (res.items ?? [])
      .map((it) => tidy(kind, it))
      .filter((it) => wellFormed(kind, it) && !seen.has(key(labelOf(it))) && seen.add(key(labelOf(it))));
    const checked = await verifyNew(lesson, kind, fresh, rejected);
    items = [...items, ...checked];
    if (closedSet && items.length > closedSet) items = items.slice(0, closedSet);
    if (kind === 'bar') items = items.sort((a, b) => b.value - a.value);
    console.log(`    · ${lesson.key}: round ${round + 1} +${checked.length}/${fresh.length} → ${items.length}${closedSet ? ` of ${closedSet}` : ''}`);
    // Written after every round so an interrupted run keeps its work.
    if (checked.length) save({ visual: { ...lesson.visual, items } as Visual, funFacts, closedSet });
    idle = checked.length ? 0 : idle + 1;
    if (idle >= (closedSet ? 3 : 2) || (!fresh.length && !closedSet)) break;
  }
  if (kind === 'timeline' && items.length > original.length) {
    items = await chronological(items);
  }
  save({ visual: { ...lesson.visual, items } as Visual, funFacts, closedSet });
  const set = closedSet ? ` (set of ${closedSet}${items.length !== closedSet ? ' ⚠ incomplete' : ''})` : items.length < target ? ' (subject ran out)' : '';
  console.log(`  ✓ ${lesson.key}: ${original.length} → ${items.length} items${set}, ${funFacts.length} fun facts`);
}

async function run() {
  const all = rawLessons();
  const done = readExpansions();
  const min = Number(args.min);
  const todo = all.filter((l) => {
    if (!KINDS.includes(l.visual.kind as Kind)) return false;
    if (args.lesson) return l.key === args.lesson;
    const n = itemsOf(l.visual).length;
    // A finished closed set ("nine districts") is never grown past its size.
    if (done[l.key]?.closedSet && n >= done[l.key].closedSet! && !args.force) return false;
    return n < min;
  });
  console.log(`Model ${args.model ?? defaultModel()} · ${todo.length} lessons to expand`);
  if (args.dry) {
    for (const l of todo) console.log(`  ${l.key} (${l.visual.kind}, ${itemsOf(l.visual).length})`);
    return;
  }

  const out = { ...done };
  await pool(todo, Number(args.concurrency), async (lesson) => {
    try {
      await expand(lesson, done[lesson.key], (exp) => {
        out[lesson.key] = exp;
        fs.writeFileSync(expansionsFile, `${JSON.stringify(out, null, 2)}\n`);
      });
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
