import fs from 'node:fs';
import path from 'node:path';
import { extraDir, rawContent } from '../seed/data';
import type { GeneratedFile, L, SeedLesson } from '../seed/types';

// Structural check of hand-written content in src/seed/data/extra/*.json:
// bilingual text, 4 distinct choices, valid answers, unique keys, lessons that
// exist, visuals the web app can draw. Exits 1 on any error.
//
//   npm run check:extra                    # every extra file
//   npm run check:extra -- opera.json      # one file

const KINDS = new Set(['bar', 'donut', 'tree', 'family', 'pairs', 'cards', 'timeline']);
const CYRILLIC = /[Ѐ-ӿ]/;

const errors: string[] = [];
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`);

/** `sentence` = prose that must be written in Mongolian (names and titles may stay Latin). */
const text = (where: string, v: unknown, sentence = false) => {
  const l = v as L | undefined;
  if (!l || typeof l.en !== 'string' || typeof l.mn !== 'string' || !l.en.trim() || !l.mn.trim()) return err(where, 'needs non-empty { en, mn }');
  if (sentence && !CYRILLIC.test(l.mn)) err(where, `mn has no Cyrillic: "${l.mn}"`);
};

const items = (l: SeedLesson): unknown[] => ('items' in l.visual ? l.visual.items : 'nodes' in l.visual ? l.visual.nodes : []) as unknown[];

function checkLesson(l: SeedLesson, file: string) {
  const w = `${file} ${l.key}`;
  if (!l.key || !l.topicSlug || typeof l.order !== 'number') err(w, 'key, topicSlug, order required');
  for (const f of ['title', 'summary', 'body'] as const) text(`${w}.${f}`, l[f], f !== 'title');
  (l.funFacts ?? []).forEach((f, i) => text(`${w}.funFacts[${i}]`, f, true));
  const v = l.visual;
  if (!v || !KINDS.has(v.kind)) return err(w, `visual.kind must be one of ${[...KINDS].join(', ')}`);
  const seen = new Set<string>();
  const dup = (k: string, i: number) => {
    if (seen.has(k)) err(`${w}.items[${i}]`, `duplicate "${k}"`);
    seen.add(k);
  };
  if (v.kind === 'cards')
    v.items.forEach((c, i) => {
      text(`${w}.items[${i}].title`, c.title);
      if (c.subtitle) text(`${w}.items[${i}].subtitle`, c.subtitle);
      if (!c.facts?.length) err(`${w}.items[${i}]`, 'needs facts');
      c.facts?.forEach((f, j) => text(`${w}.items[${i}].facts[${j}]`, f, true));
      if (c.wiki !== undefined && typeof c.wiki !== 'string') err(`${w}.items[${i}]`, 'wiki must be a string');
      dup(c.title?.en, i);
    });
  if (v.kind === 'pairs') {
    text(`${w}.left`, v.left);
    text(`${w}.right`, v.right);
    v.items.forEach((p, i) => {
      text(`${w}.items[${i}].left`, p.left);
      text(`${w}.items[${i}].right`, p.right);
      if (p.note) text(`${w}.items[${i}].note`, p.note);
      dup(p.left?.en, i);
    });
  }
  if (v.kind === 'timeline')
    v.items.forEach((t, i) => {
      text(`${w}.items[${i}].when`, t.when);
      text(`${w}.items[${i}].title`, t.title);
      text(`${w}.items[${i}].body`, t.body, true);
    });
  if (v.kind === 'bar' || v.kind === 'donut') {
    text(`${w}.unit`, v.unit);
    v.items.forEach((b, i) => {
      text(`${w}.items[${i}].label`, b.label);
      if (typeof b.value !== 'number' || !Number.isFinite(b.value)) err(`${w}.items[${i}]`, 'value must be a number');
      if (b.note) text(`${w}.items[${i}].note`, b.note);
      dup(b.label?.en, i);
    });
  }
  if (v.kind === 'tree') {
    const ids = new Set(v.nodes.map((n) => n.id));
    v.nodes.forEach((n, i) => {
      text(`${w}.nodes[${i}].label`, n.label);
      if (n.sub) text(`${w}.nodes[${i}].sub`, n.sub);
      dup(n.id, i);
    });
    v.edges.forEach((e, i) => {
      if (!ids.has(e.from) || !ids.has(e.to)) err(`${w}.edges[${i}]`, `unknown node ${e.from} → ${e.to}`);
      if (e.label) text(`${w}.edges[${i}].label`, e.label);
    });
  }
}

function run() {
  const only = process.argv[2];
  const files = fs.readdirSync(extraDir).filter((f) => f.endsWith('.json') && (!only || f === only));
  if (!files.length) throw new Error(`no extra file ${only ?? ''}`);
  // Keys must be unique across ALL content, not just within a file.
  const all = rawContent();
  const lessonKeys = new Map<string, number>();
  for (const l of all.lessons) lessonKeys.set(l.key, (lessonKeys.get(l.key) ?? 0) + 1);
  const questionKeys = new Map<string, number>();
  for (const q of all.questions) questionKeys.set(q.key, (questionKeys.get(q.key) ?? 0) + 1);

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(extraDir, file), 'utf8')) as GeneratedFile;
    for (const l of data.lessons) {
      checkLesson(l, file);
      if ((lessonKeys.get(l.key) ?? 0) > 1) err(`${file} ${l.key}`, 'lesson key used twice');
    }
    const perLesson = new Map<string, number>();
    data.questions.forEach((q, i) => {
      const w = `${file} ${q.key ?? `questions[${i}]`}`;
      if (!lessonKeys.has(q.lessonKey)) err(w, `unknown lessonKey ${q.lessonKey}`);
      if ((questionKeys.get(q.key) ?? 0) > 1) err(w, 'question key used twice');
      if (![1, 2, 3].includes(q.difficulty)) err(w, 'difficulty must be 1 | 2 | 3');
      text(`${w}.prompt`, q.prompt, true);
      text(`${w}.explanation`, q.explanation, true);
      if (!Array.isArray(q.choices) || q.choices.length !== 4) err(w, 'needs exactly 4 choices');
      q.choices?.forEach((c, j) => text(`${w}.choices[${j}]`, c));
      for (const lang of ['en', 'mn'] as const) {
        const set = new Set(q.choices?.map((c) => c[lang]?.trim().toLowerCase()));
        if (set.size !== q.choices?.length) err(w, `duplicate ${lang} choices`);
      }
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(w, 'answer must be 0–3');
      perLesson.set(q.lessonKey, (perLesson.get(q.lessonKey) ?? 0) + 1);
    });
    const answers = [0, 1, 2, 3].map((a) => data.questions.filter((q) => q.answer === a).length);
    console.log(`${file}: ${data.lessons.length} lessons, ${data.questions.length} questions (answers ${answers.join('/')})`);
    for (const l of data.lessons) console.log(`  ${l.key} [${l.visual.kind} ${items(l).length}] ${perLesson.get(l.key) ?? 0} q`);
  }
  if (errors.length) {
    console.error(`\n${errors.length} error(s):\n${errors.slice(0, 80).join('\n')}`);
    process.exit(1);
  }
  console.log('OK');
}

run();
