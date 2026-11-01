import fs from 'node:fs';
import path from 'node:path';
import type { Categories, Expansion, GeneratedFile, SeedBundle } from '../types';
import { gods } from './gods';
import { geography } from './geography';
import { pubquiz } from './pubquiz';
import { space } from './space';
import { astrology } from './astrology';
import { mapContent } from './maps';

/** Same folder from src/ (ts-node) and dist/ (seed:prod): JSON isn't copied by tsc. */
export const generatedDir = path.resolve(__dirname, '../../..', 'src/seed/data/generated');

export const readGenerated = (slug: string): GeneratedFile => {
  const file = path.join(generatedDir, `${slug}.json`);
  if (!fs.existsSync(file)) return { lessons: [], questions: [] };
  return JSON.parse(fs.readFileSync(file, 'utf8')) as GeneratedFile;
};

/**
 * More content as JSON (src/seed/data/extra/*.json, same shape as a generated
 * file): each file may add lessons and questions to any topic — rows are
 * routed by their topicSlug.
 */
export const extraDir = path.resolve(__dirname, '../../..', 'src/seed/data/extra');

const readExtra = (): GeneratedFile[] =>
  fs.existsSync(extraDir)
    ? fs
        .readdirSync(extraDir)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => JSON.parse(fs.readFileSync(path.join(extraDir, f), 'utf8')) as GeneratedFile)
    : [];

export const handWritten: SeedBundle[] = [gods, geography, pubquiz, space, astrology];

/** Gemini output for topics that have no hand-written file (new categories). */
const generatedSlugs = () =>
  fs.existsSync(generatedDir) ? fs.readdirSync(generatedDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')) : [];

/**
 * Completed visuals from `npm run expand` (src/seed/data/expansions.json):
 * lessonKey → the full visual + fun facts, laid over the lesson as written.
 */
export const expansionsFile = path.resolve(__dirname, '../../..', 'src/seed/data/expansions.json');

export const readExpansions = (): Record<string, Expansion> =>
  fs.existsSync(expansionsFile) ? (JSON.parse(fs.readFileSync(expansionsFile, 'utf8')) as Record<string, Expansion>) : {};

/** Every lesson and question from all sources, still under the topic it was written for. */
export const rawContent = (): GeneratedFile => {
  const files = [...handWritten, ...generatedSlugs().map(readGenerated), ...readExtra()];
  const expansions = readExpansions();
  const lessons = files.flatMap((f) => f.lessons).map((l) => {
    if (!expansions[l.key]) return l;
    const { closedSet: _closedSet, ...overlay } = expansions[l.key];
    return { ...l, ...overlay };
  });
  const maps = mapContent(lessons);
  return {
    lessons: [...lessons, ...maps.lessons],
    questions: [...files.flatMap((f) => f.questions), ...maps.questions],
  };
};

export const rawLessons = () => rawContent().lessons;

export const categoriesFile = path.resolve(__dirname, '../../..', 'src/seed/data/categories.json');

export const readCategories = (): Categories | null =>
  fs.existsSync(categoriesFile) ? (JSON.parse(fs.readFileSync(categoriesFile, 'utf8')) as Categories) : null;

/**
 * Groups the content into topics. With categories.json, lessons (and their
 * questions) move to the category Gemini assigned and are renumbered in its
 * order; lessons it doesn't list (generated later) stay where they were written.
 */
export const arrange = ({ lessons, questions }: GeneratedFile, categories: Categories | null): SeedBundle[] => {
  const topics = categories?.topics.map((t) => t.topic) ?? handWritten.map((b) => b.topic);
  const placed = new Map<string, { slug: string; order: number }>();
  for (const t of categories?.topics ?? []) t.lessons.forEach((key, i) => placed.set(key, { slug: t.topic.slug, order: i + 1 }));
  const lessonTopic = new Map<string, string>();
  const routed = lessons.map((l) => {
    const p = placed.get(l.key);
    const moved = p ? { ...l, topicSlug: p.slug, order: p.order } : { ...l, order: l.order + 1000 };
    lessonTopic.set(l.key, moved.topicSlug);
    return moved;
  });
  const routedQuestions = questions.map((q) => ({ ...q, topicSlug: lessonTopic.get(q.lessonKey) ?? q.topicSlug }));
  return topics.map((topic) => ({
    topic,
    lessons: routed.filter((l) => l.topicSlug === topic.slug).sort((a, b) => a.order - b.order).map((l, i) => ({ ...l, order: i + 1 })),
    questions: routedQuestions.filter((q) => q.topicSlug === topic.slug),
  }));
};

export const bundles: SeedBundle[] = arrange(rawContent(), readCategories());
