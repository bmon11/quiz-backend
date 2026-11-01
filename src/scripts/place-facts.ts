import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { pool } from '../ai/quiz-tools';
import { rawLessons } from '../seed/data';
import { placeFactsFile, readPlaceFacts } from '../seed/place-facts';
import { placeNamed, readPlaces, type Place } from '../seed/places';
import type { L, MapName, PlaceProfile } from '../seed/types';

// A profile for every region on the maps: tapping Dornod shows its centre
// (Choibalsan, called Bayantümen until 1941), founding year, emblem, sums…
// Gemini drafts each place with Google Search, a second grounded pass drops
// anything wrong or doubtful. Writes src/seed/data/place-facts.json (read by
// GET /places/:map/:id — no seed needed). Review the diff before committing.
//
//   npm run place-facts                      # aimags, then countries
//   npm run place-facts -- --map mongolia --place dornod --force

const { values: args } = parseArgs({
  options: {
    map: { type: 'string' },
    place: { type: 'string' },
    force: { type: 'boolean', default: false },
    model: { type: 'string' },
    concurrency: { type: 'string', default: '4' },
  },
});

const L_SCHEMA = { type: 'object', properties: { en: { type: 'string' }, mn: { type: 'string' } }, required: ['en', 'mn'] };

const SCHEMA = {
  type: 'object',
  properties: {
    summary: { ...L_SCHEMA, description: 'one short line that sums the place up' },
    stats: {
      type: 'array',
      items: { type: 'object', properties: { label: L_SCHEMA, value: L_SCHEMA }, required: ['label', 'value'] },
    },
    formerNames: {
      type: 'array',
      items: { type: 'object', properties: { name: L_SCHEMA, period: L_SCHEMA }, required: ['name', 'period'] },
      description: 'earlier names of the place or its centre / capital, each with when it was used',
    },
    symbols: { type: 'array', items: L_SCHEMA },
    facts: { type: 'array', items: L_SCHEMA },
  },
  required: ['summary', 'stats', 'formerNames', 'symbols', 'facts'],
};

const BRIEF: Record<MapName, string> = {
  mongolia: `This is one of Mongolia's 21 aimags (or the capital Ulaanbaatar).
- stats (5–7): aimag centre, year founded (as a modern aimag), area km², population (latest official census/estimate, with year), number of sums, distance from Ulaanbaatar; for Ulaanbaatar use districts instead of sums.
- formerNames: earlier names of the aimag AND of its centre town, with the period (e.g. Choibalsan was Bayantümen until 1941; Khovd town was called Jargalant; Mörön, Tsetserleg… had other names). Empty if there were none.
- symbols: what the aimag's emblem (coat of arms) shows and means, its symbol animal / mountain / colours, and any sacred mountain or nickname.
- facts (6–8): history, nature (lakes, mountains, protected areas), economy (mines, livestock), ethnic groups, famous people born there, records.`,
  world: `This is a country (or territory).
- stats (5–7): capital, official language(s), population (latest, with year), area km², currency, year of independence / founding where meaningful.
- formerNames: earlier names of the country or its capital, with the period (e.g. Myanmar was Burma until 1989). Empty if none.
- symbols: national animal, national flower, what the flag shows, national motto.
- facts (6–8): the most quiz-worthy history, geography, culture and records, and any link with Mongolia.`,
};

const SYSTEM = `You write place profiles for a bilingual (English + Mongolian) trivia-learning app for Mongolian adults.
Rules:
- Facts must be mainstream and verifiable (Wikipedia-level), current as of today. Use Google Search to confirm names, dates and numbers.
- Every string has "en" and "mn". Mongolian must be natural modern Cyrillic Mongolian as written by an educated native speaker — not a word-for-word translation. Use established Mongolian spellings of names. Values stay short ("Choibalsan", "1921", "123,597 km²").
- No sentence restates another; facts are concrete, one sentence each.`;

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'string' }, ok: { type: 'boolean' }, reason: { type: 'string' } },
        required: ['id', 'ok', 'reason'],
      },
    },
  },
  required: ['results'],
};

type Line = { id: string; text: string };

/** Every statement in the profile, flattened so the checker can judge each one. */
const linesOf = (p: PlaceProfile): Line[] => [
  { id: 'summary', text: `${p.summary.en} / ${p.summary.mn}` },
  ...p.stats.map((s, i) => ({ id: `stat${i}`, text: `${s.label.en}: ${s.value.en} / ${s.label.mn}: ${s.value.mn}` })),
  ...p.formerNames.map((f, i) => ({ id: `former${i}`, text: `Former name: ${f.name.en} (${f.period.en}) / ${f.name.mn} (${f.period.mn})` })),
  ...p.symbols.map((s, i) => ({ id: `symbol${i}`, text: `${s.en} / ${s.mn}` })),
  ...p.facts.map((f, i) => ({ id: `fact${i}`, text: `${f.en} / ${f.mn}` })),
];

/** Rejected line id → the checker's reason. */
async function verify(place: Place, profile: PlaceProfile): Promise<Map<string, string>> {
  const lines = linesOf(profile);
  const { results } = await generateJson<{ results: { id: string; ok: boolean; reason: string }[] }>({
    model: args.model,
    system:
      'You are a strict fact-checker for a quiz app. Use Google Search. Mark ok=false for any line with a wrong or doubtful name, date, number or fact, or a wrong / unnatural Mongolian translation.',
    prompt: `Place: ${place.en} (${place.mn})\nCheck each line:\n${lines.map((l) => `${l.id}: ${l.text}`).join('\n')}`,
    schema: VERIFY_SCHEMA,
    search: true,
    temperature: 0,
  });
  const bad = new Map<string, string>();
  for (const l of lines) {
    const r = results.find((x) => x.id === l.id);
    if (!r?.ok) bad.set(l.id, `${l.text} — ${r?.reason ?? 'not checked'}`);
  }
  return bad;
}

const keep = (p: PlaceProfile, bad: Map<string, string>): PlaceProfile => ({
  summary: bad.has('summary') ? { en: '', mn: '' } : p.summary,
  stats: p.stats.filter((_, i) => !bad.has(`stat${i}`)),
  formerNames: p.formerNames.filter((_, i) => !bad.has(`former${i}`)),
  symbols: p.symbols.filter((_, i) => !bad.has(`symbol${i}`)),
  facts: p.facts.filter((_, i) => !bad.has(`fact${i}`)),
});

const filled = (l?: L) => Boolean(l?.en?.trim() && l?.mn?.trim());

type Fix = { id: string; a: L; b: L };

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    fixes: {
      type: 'array',
      items: { type: 'object', properties: { id: { type: 'string' }, a: L_SCHEMA, b: L_SCHEMA }, required: ['id', 'a', 'b'] },
    },
  },
  required: ['fixes'],
};

/** The profile with corrected lines swapped in at their ids. */
const applyFixes = (p: PlaceProfile, fixes: Map<string, Fix>): PlaceProfile => ({
  summary: fixes.get('summary')?.a ?? p.summary,
  stats: p.stats.map((st, i) => {
    const f = fixes.get(`stat${i}`);
    return f && filled(f.b) ? { label: f.a, value: f.b } : st;
  }),
  formerNames: p.formerNames.map((fn, i) => {
    const f = fixes.get(`former${i}`);
    return f && filled(f.b) ? { name: f.a, period: f.b } : fn;
  }),
  symbols: p.symbols.map((sy, i) => fixes.get(`symbol${i}`)?.a ?? sy),
  facts: p.facts.map((fa, i) => fixes.get(`fact${i}`)?.a ?? fa),
});

const tidy = (draft: PlaceProfile): PlaceProfile => ({
  summary: draft.summary ?? { en: '', mn: '' },
  stats: (draft.stats ?? []).filter((s) => filled(s.label) && filled(s.value)),
  formerNames: (draft.formerNames ?? []).filter((f) => filled(f.name) && filled(f.period)),
  symbols: (draft.symbols ?? []).filter(filled),
  facts: (draft.facts ?? []).filter(filled),
});

async function profile(map: MapName, place: Place, flag?: string): Promise<PlaceProfile> {
  const draft = await generateJson<PlaceProfile>({
    model: args.model,
    system: SYSTEM,
    prompt: `${BRIEF[map]}\n\nPlace: ${place.en} / ${place.mn}`,
    schema: SCHEMA,
    search: true,
    temperature: 0.3,
  });
  const clean = tidy(draft);
  const bad = await verify(place, clean);
  // Rejected lines are often right in spirit with a wrong date (Jargalant
  // 1925–1961, not 1931–1992): one rewrite of just those lines, re-checked.
  let fixedLines = new Map<string, Fix>();
  if (bad.size) {
    const { fixes } = await generateJson<{ fixes: Fix[] }>({
      model: args.model,
      system: SYSTEM,
      prompt: `Place: ${place.en} / ${place.mn}
A fact-checker rejected these lines of the profile. For each id, return the corrected line (stat: a = label, b = value; former name: a = name, b = period; summary / symbol / fact: a = the sentence, b = ""). Leave an id out if it cannot be stated correctly.
${[...bad].map(([id, why]) => `${id}: ${why}`).join('\n')}`,
      schema: FIX_SCHEMA,
      search: true,
      temperature: 0.2,
    });
    fixedLines = new Map((fixes ?? []).filter((f) => bad.has(f.id) && filled(f.a)).map((f) => [f.id, f]));
    const recheck = await verify(place, applyFixes(clean, fixedLines));
    for (const [id, why] of recheck) {
      if (fixedLines.has(id)) console.log(`    ✗ ${place.id}: ${why}`);
      fixedLines.delete(id);
    }
  }
  const kept = keep(applyFixes(clean, fixedLines), new Map([...bad].filter(([id]) => !fixedLines.has(id))));
  return { ...kept, ...(flag && { flag }) };
}

/** Flags already on the aimag cards (Commons files). */
const aimagFlags = () => {
  const out = new Map<string, string>();
  const cards = rawLessons().find((l) => l.key === 'mongolia.aimag-flags')?.visual;
  if (cards?.kind !== 'cards') return out;
  for (const c of cards.items) {
    const id = placeNamed(c.title.en, 'mongolia');
    if (id && c.image) out.set(id, c.image);
  }
  return out;
};

async function run() {
  const places = readPlaces();
  const maps = (args.map ? [args.map] : ['mongolia', 'world']) as MapName[];
  const out = readPlaceFacts();
  const flags = aimagFlags();
  for (const map of maps) {
    const done = (out[map] ??= {});
    const todo = places[map].filter((p) => (args.place ? p.id === args.place : args.force || !done[p.id]));
    console.log(`Model ${args.model ?? defaultModel()} · ${map}: ${todo.length} places`);
    await pool(todo, Number(args.concurrency), async (place) => {
      try {
        const p = await profile(map, place, map === 'mongolia' ? flags.get(place.id) : undefined);
        done[place.id] = p;
        // Written after every place so an interrupted run keeps its work.
        fs.writeFileSync(placeFactsFile, `${JSON.stringify(out, null, 2)}\n`);
        console.log(`  ✓ ${map}/${place.id}: ${p.stats.length} stats, ${p.formerNames.length} former names, ${p.symbols.length} symbols, ${p.facts.length} facts`);
      } catch (err) {
        console.log(`  ✗ ${map}/${place.id}: ${(err as Error).message}`);
      }
    });
  }
  console.log(`Done · ${usage.calls} calls · ${usage.inputTokens} in / ${usage.outputTokens} out tokens`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
