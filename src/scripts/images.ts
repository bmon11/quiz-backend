import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { generateJson, usage, defaultModel } from '../ai/gemini';
import { pool } from '../ai/quiz-tools';
import { expansionsFile, readExpansions, rawLessons } from '../seed/data';
import type { Expansion, Photo, SeedLesson, Visual } from '../seed/types';

// Real pictures for card lessons (paintings, sculptures, people, places…).
// Gemini names the English Wikipedia article of each card, then the article's
// lead image is taken from Wikipedia — free licences only (pilicense=free), so
// every picture is a Wikimedia Commons file the card can credit. Writes the
// photos into src/seed/data/expansions.json; review, then `npm run seed`.
//
//   npm run images                                   # every card lesson
//   npm run images -- --lesson pubquiz.world-famous-paintings --force

const { values: args } = parseArgs({
  options: {
    lesson: { type: 'string' },
    force: { type: 'boolean', default: false },
    model: { type: 'string' },
    concurrency: { type: 'string', default: '4' },
  },
});

type Card = Extract<Visual, { kind: 'cards' }>['items'][number];

const WIKI_SCHEMA = {
  type: 'object',
  properties: {
    titles: {
      type: 'array',
      items: {
        type: 'object',
        properties: { index: { type: 'integer' }, wiki: { type: 'string' } },
        required: ['index', 'wiki'],
      },
    },
  },
  required: ['titles'],
};

/** Gemini maps each card to its exact English Wikipedia article ("" = nothing to picture). */
async function wikiTitles(lesson: SeedLesson, cards: Card[]): Promise<string[]> {
  const listing = cards.map((c, i) => `#${i} ${c.title.en}${c.subtitle ? ` — ${c.subtitle.en}` : ''}`).join('\n');
  const { titles } = await generateJson<{ titles: { index: number; wiki: string }[] }>({
    model: args.model,
    system:
      'You map quiz cards to English Wikipedia articles. Give the exact article title (as in the URL, spaces allowed) of the specific thing the card is about: the painting, not the painter; the sculpture, not the museum; the person, place, animal or object itself. Use "" when the card is an abstract idea, a joke, a riddle or a list with no single article whose picture would show it.',
    prompt: `Lesson: ${lesson.title.en} — ${lesson.summary.en}\nCards:\n${listing}`,
    schema: WIKI_SCHEMA,
    temperature: 0,
  });
  return cards.map((_, i) => titles.find((t) => t.index === i)?.wiki?.trim() ?? '');
}

const UA = 'TriviaWiki/1.0 (content build script; https://github.com/bmon11/quiz-backend)';
const clean = (url: string) => url.split('?')[0].replace('//thumb.wikimedia.org/', '//upload.wikimedia.org/');

/** Lead images of up to 50 articles per request, keyed by the title asked for. */
async function leadImages(titles: string[]): Promise<Map<string, Photo>> {
  const out = new Map<string, Photo>();
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const url = new URL('https://en.wikipedia.org/w/api.php');
    Object.entries({
      action: 'query',
      format: 'json',
      formatversion: '2',
      redirects: '1',
      prop: 'pageimages|pageprops',
      ppprop: 'disambiguation',
      piprop: 'thumbnail|name|original',
      pithumbsize: '1920',
      pilicense: 'free',
      titles: chunk.join('|'),
    }).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Wikipedia ${res.status}`);
    const { query } = (await res.json()) as {
      query?: {
        normalized?: { from: string; to: string }[];
        redirects?: { from: string; to: string }[];
        pages: { title: string; pageprops?: { disambiguation?: string }; pageimage?: string; thumbnail?: { source: string; width: number; height: number }; original?: { source: string } }[];
      };
    };
    if (!query) continue;
    const follow = (t: string) => {
      const n = query.normalized?.find((x) => x.from === t)?.to ?? t;
      return query.redirects?.find((x) => x.from === n)?.to ?? n;
    };
    for (const asked of chunk) {
      const page = query.pages.find((p) => p.title === follow(asked));
      if (!page?.thumbnail || !page.pageimage || page.pageprops?.disambiguation !== undefined) continue;
      const full = clean(page.thumbnail.source);
      // Wikimedia serves fixed thumbnail widths; 500px is plenty for a card.
      const src = full.includes('/1920px-') && page.thumbnail.width > 500 ? full.replace('/1920px-', '/500px-') : full;
      out.set(asked, { src, full, width: page.thumbnail.width, height: page.thumbnail.height, file: page.pageimage });
    }
  }
  return out;
}

/** Best article for free text ("The Harvesters Pieter Bruegel the Elder"), or "". */
async function searchTitle(text: string): Promise<string> {
  const url = new URL('https://en.wikipedia.org/w/api.php');
  Object.entries({ action: 'query', format: 'json', formatversion: '2', list: 'search', srlimit: '1', srsearch: text }).forEach(([k, v]) =>
    url.searchParams.set(k, v)
  );
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return '';
  const { query } = (await res.json()) as { query?: { search: { title: string }[] } };
  return query?.search[0]?.title ?? '';
}

const MATCH_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: { type: 'object', properties: { index: { type: 'integer' }, ok: { type: 'boolean' } }, required: ['index', 'ok'] },
    },
  },
  required: ['results'],
};

/**
 * Article lead images are sometimes about the article, not the thing (a photo of
 * a president beside the painting, another artist's version). The file name is
 * descriptive enough for Gemini to catch those.
 */
async function matching(lesson: SeedLesson, pairs: { card: Card; file: string }[]): Promise<boolean[]> {
  if (!pairs.length) return [];
  const listing = pairs
    .map((p, i) => `#${i} card: ${p.card.title.en}${p.card.subtitle ? ` — ${p.card.subtitle.en}` : ''} | image file: ${decodeURIComponent(p.file)}`)
    .join('\n');
  const { results } = await generateJson<{ results: { index: number; ok: boolean }[] }>({
    model: args.model,
    system:
      'You check pictures for quiz cards by their Wikimedia file names. ok=true when the file plausibly shows the card\'s subject itself (the artwork, person, place, creature, object — a detail, photo or reproduction is fine). ok=false when it shows something else: another person, another artist\'s work, an unrelated scene, a map or logo for a non-logo card. Generic camera names (DSC_0042.jpg) are ok=true.',
    prompt: `Lesson: ${lesson.title.en}\n${listing}`,
    schema: MATCH_SCHEMA,
    temperature: 0,
  });
  return pairs.map((_, i) => results.find((r) => r.index === i)?.ok ?? true);
}

const STOP = new Set(['the', 'a', 'an', 'of', 'at', 'in', 'on', 'and', 'de', 'la', 'le', 'du']);
const words = (text: string) =>
  text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w && !STOP.has(w));

/** A search hit counts only if it names every main word of the card ("Ophelia" → "Ophelia (Millais)"). */
const sameThing = (card: string, page: string) => {
  const have = new Set(words(page));
  return words(card).every((w) => have.has(w));
};

async function illustrate(lesson: SeedLesson): Promise<Card[] | null> {
  const cards = (lesson.visual as Extract<Visual, { kind: 'cards' }>).items;
  // Flags and other fact-pictures (`image`) stay as they are.
  const todo = cards.map((c, i) => ({ c, i })).filter(({ c }) => !c.image && (args.force || !c.photo));
  if (!todo.length) return null;
  const need = todo.filter(({ c }) => args.force || c.wiki === undefined);
  const named = new Map<number, string>();
  for (let i = 0; i < need.length; i += 40) {
    const chunk = need.slice(i, i + 40);
    const titles = await wikiTitles(lesson, chunk.map((x) => x.c));
    chunk.forEach((x, j) => named.set(x.i, titles[j]));
  }
  const wikiOf = (i: number) => named.get(i) ?? cards[i].wiki ?? '';
  const photos = await leadImages([...new Set(todo.map(({ i }) => wikiOf(i)).filter(Boolean))]);
  // A wrong guess (missing page, disambiguation) gets one search on the card's own words.
  for (const { c, i } of todo) {
    if (!wikiOf(i) || photos.has(wikiOf(i))) continue;
    const found = await searchTitle(`${c.title.en} ${c.subtitle?.en ?? ''}`.trim());
    if (!found || found === wikiOf(i) || !sameThing(c.title.en, found)) continue;
    const photo = (await leadImages([found])).get(found);
    if (photo) {
      named.set(i, found);
      photos.set(found, photo);
    }
  }
  const resolved = todo.filter(({ i }) => wikiOf(i) && photos.has(wikiOf(i)));
  const verdicts: boolean[] = [];
  for (let k = 0; k < resolved.length; k += 60) {
    const chunk = resolved.slice(k, k + 60);
    verdicts.push(...(await matching(lesson, chunk.map(({ c, i }) => ({ card: c, file: photos.get(wikiOf(i))!.file })))));
  }
  const rejected = new Set(resolved.filter((_, k) => !verdicts[k]).map(({ i }) => i));
  for (const i of rejected) console.log(`    ✗ ${lesson.key}: "${cards[i].title.en}" ≠ ${decodeURIComponent(photos.get(wikiOf(i))!.file)}`);
  let found = 0;
  const next = cards.map((c, i) => {
    if (!todo.some((x) => x.i === i)) return c;
    const wiki = wikiOf(i);
    const photo = wiki && !rejected.has(i) ? photos.get(wiki) : undefined;
    if (photo) found += 1;
    const { photo: _old, ...rest } = c;
    return photo ? { ...rest, wiki, photo } : { ...rest, wiki };
  });
  console.log(`  ✓ ${lesson.key}: ${found}/${todo.length} photos`);
  return next;
}

async function run() {
  const lessons = rawLessons().filter(
    (l) => l.visual.kind === 'cards' && (!args.lesson || l.key === args.lesson)
  );
  console.log(`Model ${args.model ?? defaultModel()} · ${lessons.length} card lessons`);
  const out: Record<string, Expansion> = readExpansions();
  await pool(lessons, Number(args.concurrency), async (lesson) => {
    try {
      const items = await illustrate(lesson);
      if (!items) return;
      // Re-read so a parallel `npm run expand` writing the same file isn't clobbered.
      const latest = readExpansions();
      Object.assign(out, latest);
      out[lesson.key] = {
        ...(latest[lesson.key] ?? { funFacts: lesson.funFacts }),
        visual: { ...lesson.visual, items } as Visual,
      };
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
