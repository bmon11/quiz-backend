import fs from 'node:fs';
import path from 'node:path';
import type { L, MapItem, MapName, MapPayload, QuestionMap, SeedLesson, SeedQuestion } from './types';

// Finds the aimags / countries a text names, so geography questions and
// lessons can show them on a vector map. Names come from src/seed/data/places.json
// (npm run maps).

export type Place = { id: string; en: string; mn: string; aliases: string[]; continent?: string };

/** Categories whose questions and lessons get maps. */
export const GEO_TOPICS = new Set(['mongolia', 'ulaanbaatar', 'geography', 'countries']);

const placesFile = path.resolve(__dirname, '../..', 'src/seed/data/places.json');

let cache: Record<MapName, Place[]> | null = null;
export const readPlaces = (): Record<MapName, Place[]> => {
  if (!cache) cache = fs.existsSync(placesFile) ? JSON.parse(fs.readFileSync(placesFile, 'utf8')) : { mongolia: [], world: [] };
  return cache!;
};

/** Accents off (Ölgii → Olgii) and curly quotes straight, so spellings meet. */
export const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[’‘]/g, "'");

const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type Matcher = { re: RegExp; idOf: Map<string, string> };
const matchers = new Map<MapName, Matcher>();

const matcherFor = (map: MapName): Matcher => {
  const cached = matchers.get(map);
  if (cached) return cached;
  const idOf = new Map<string, string>();
  for (const p of readPlaces()[map]) for (const name of [p.en, ...p.aliases]) idOf.set(fold(name), p.id);
  // Longest first, so "Papua New Guinea" wins over "Guinea" at the same spot.
  const names = [...idOf.keys()].sort((a, b) => b.length - a.length).map(escapeRe);
  // A river / valley / square named after a place isn't that place (Selenge River,
  // Sükhbaatar Square), nor is a person ("D. Sükhbaatar", "Damdin Sükhbaatar").
  const re = new RegExp(
    `(?<![\\p{L}-])(?<!\\b\\p{Lu}\\.\\s?)(?<!Damdin\\s)(${names.join('|')})(?![\\p{L}-])(?!\\s+(?:River|Valley|Square|Lake|Mountains?|Range|Basin|Strait|Sea|Gulf|Desert)\\b)`,
    'gu'
  );
  const built = { re, idOf };
  matchers.set(map, built);
  return built;
};

/** Ids of the places `text` names, in order of appearance. Case-sensitive: places are proper nouns. */
export const findPlaces = (text: string | undefined, map: MapName): string[] => {
  if (!text) return [];
  const { re, idOf } = matcherFor(map);
  const found: string[] = [];
  for (const m of fold(text).matchAll(re)) {
    const id = idOf.get(m[1]);
    if (id && !found.includes(id)) found.push(id);
  }
  return found;
};

/** A whole label that is a place ("Khovd", "Japan") — not one that merely mentions one. */
export const placeNamed = (label: string | undefined, map: MapName) =>
  label ? matcherFor(map).idOf.get(fold(label.trim())) : undefined;

const uniq = (ids: string[]) => [...new Set(ids)];

/** Places every question in these categories is about — marking only them says nothing. */
const HOME = new Set(['ulaanbaatar', 'MNG']);

/**
 * Which map a question belongs on and what to highlight: places in the right
 * answer and the prompt (explanations name too many asides to use). Aimags win
 * over countries (a Mongolia question names both). Prompt places that are also
 * choices are not shown before answering — that would point at an answer.
 */
export const tagMap = (q: SeedQuestion): QuestionMap | null => {
  if (q.map !== undefined) return q.map;
  const right = q.choices[q.answer]?.en;
  const choiceText = q.choices.map((c) => c.en);
  for (const name of ['mongolia', 'world'] as const) {
    const inAnswer = findPlaces(right, name);
    const inPrompt = findPlaces(q.prompt.en, name);
    if (!inAnswer.length && !inPrompt.length) continue;
    const inChoices = new Set(choiceText.flatMap((c) => findPlaces(c, name)));
    const context = inPrompt.filter((id) => !inChoices.has(id) && !inAnswer.includes(id)).slice(0, 3);
    const answer = uniq([...inAnswer, ...inPrompt.filter((id) => !context.includes(id))]).slice(0, 4);
    const all = [...context, ...answer];
    if (!all.length || (!inAnswer.length && all.every((id) => HOME.has(id)))) continue;
    return { name, context, answer };
  }
  return null;
};

type Row = { label: L; value?: number; subtitle?: L; facts?: L[] };

/** The rows a lesson visual lists, in a common shape. */
const rowsOf = (lesson: SeedLesson): Row[] => {
  const v = lesson.visual;
  if (v.kind === 'bar' || v.kind === 'donut') return v.items.map((i) => ({ label: i.label, value: i.value, facts: i.note ? [i.note] : [] }));
  if (v.kind === 'cards') return v.items.map((i) => ({ label: i.title, subtitle: i.subtitle, facts: i.facts }));
  if (v.kind === 'pairs') return v.items.map((i) => ({ label: i.left, subtitle: i.right, facts: i.note ? [i.note] : [] }));
  return [];
};

/**
 * A map for a lesson whose visual lists places (aimag cards, country bars,
 * capitals…): at least 3 rows must be places, on the map with the most hits.
 */
export const lessonMap = (lesson: SeedLesson, unit?: L): MapPayload | null => {
  if (lesson.visual.kind === 'map') return null;
  const rows = rowsOf(lesson);
  let best: MapPayload | null = null;
  for (const name of ['mongolia', 'world'] as const) {
    const items: MapItem[] = [];
    for (const r of rows) {
      const id = placeNamed(r.label.en, name);
      if (!id || items.some((i) => i.id === id)) continue;
      items.push({
        id,
        title: r.label,
        ...(r.value !== undefined && { value: r.value }),
        ...(r.subtitle && { subtitle: r.subtitle }),
        ...(r.facts?.length && { facts: r.facts.slice(0, 4) }),
      });
    }
    if (items.length >= 3 && items.length > (best?.items.length ?? 0)) {
      const barUnit = lesson.visual.kind === 'bar' || lesson.visual.kind === 'donut' ? lesson.visual.unit : unit;
      best = { map: name, ...(barUnit && items.some((i) => i.value !== undefined) && { unit: barUnit }), items };
    }
  }
  return best;
};
