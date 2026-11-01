import { Topic } from '../modules/topic/topic.model';
import { Lesson } from '../modules/lesson/lesson.model';
import { Question } from '../modules/question/question.model';
import { Attempt } from '../modules/attempt/attempt.model';
import type { FamilyPerson, SeedBundle, SeedQuestion, Visual } from './types';
import { GEO_TOPICS, lessonMap, tagMap } from './places';

type Family = Extract<Visual, { kind: 'family' }>;

const familyOf = ({ lessons }: SeedBundle): Family | null =>
  (lessons.find((l) => l.visual.kind === 'family')?.visual as Family | undefined) ?? null;

const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Which family-tree people a question is about, so the quiz can show their
 * branch of the tree. Names (Greek or Roman, English text) found in the right
 * answer come first, then the prompt, then the explanation.
 */
export const tagGods = (question: SeedQuestion, people: FamilyPerson[]): string[] => {
  if (question.gods) return question.gods;
  const patterns = people.map((p) => {
    const names = [p.name.en.replace(/^The /, ''), p.roman?.en].filter(Boolean) as string[];
    // Letter-aware boundaries: \b misses names ending in a non-ASCII letter (Danaë).
    return { id: p.id, re: new RegExp(`(?<!\\p{L})(${names.map(escapeRe).join('|')})(?!\\p{L})`, 'u') };
  });
  const found: string[] = [];
  for (const text of [question.choices[question.answer]?.en, question.prompt.en, question.explanation.en]) {
    for (const { id, re } of patterns) if (text && re.test(text) && !found.includes(id)) found.push(id);
  }
  return found.slice(0, 3);
};

/** Catches authoring mistakes before anything is written. */
export const validateBundle = ({ topic, lessons, questions }: SeedBundle) => {
  const errors: string[] = [];
  const lessonKeys = new Set(lessons.map((l) => l.key));
  if (lessonKeys.size !== lessons.length) errors.push(`${topic.slug}: duplicate lesson keys`);
  const questionKeys = new Set(questions.map((q) => q.key));
  if (questionKeys.size !== questions.length) errors.push(`${topic.slug}: duplicate question keys`);
  for (const l of lessons) if (l.topicSlug !== topic.slug) errors.push(`${l.key}: wrong topicSlug`);
  const family = familyOf({ topic, lessons, questions });
  if (family) {
    const ids = new Set(family.people.map((p) => p.id));
    if (ids.size !== family.people.length) errors.push(`${topic.slug}: duplicate family person ids`);
    for (const u of family.unions) {
      for (const id of [...u.partners, ...u.children]) {
        if (!ids.has(id)) errors.push(`${topic.slug}: family union refers to unknown person "${id}"`);
      }
    }
    for (const p of family.people) {
      for (const id of p.spouses ?? []) if (!ids.has(id)) errors.push(`${p.id}: unknown spouse "${id}"`);
    }
  }
  for (const q of questions) {
    if (q.topicSlug !== topic.slug) errors.push(`${q.key}: wrong topicSlug`);
    if (!lessonKeys.has(q.lessonKey)) errors.push(`${q.key}: unknown lessonKey ${q.lessonKey}`);
    if (q.choices.length !== 4) errors.push(`${q.key}: needs exactly 4 choices`);
    if (!(q.answer >= 0 && q.answer < q.choices.length)) errors.push(`${q.key}: answer out of range`);
  }
  return errors;
};

/**
 * Upserts content by stable key and removes lessons/questions that were
 * deleted from the seed files. Answer stats on existing questions are kept, and
 * anything the admin page owns (origin "admin") is never overwritten or removed.
 */
export const seedBundles = async (bundles: SeedBundle[]) => {
  const errors = bundles.flatMap(validateBundle);
  if (errors.length) throw new Error(`Seed content is invalid:\n  ${errors.join('\n  ')}`);

  const report: string[] = [];
  for (const bundle of bundles) {
    const { topic } = bundle;
    const people = familyOf(bundle)?.people ?? [];
    // Geography gets maps; null (not undefined) so $set clears a stale one.
    const geo = GEO_TOPICS.has(topic.slug);
    const lessons = bundle.lessons.map((l) => ({ ...l, map: geo ? lessonMap(l) : null }));
    const questions = bundle.questions.map((q) => ({ ...q, gods: tagGods(q, people), map: geo ? tagMap(q) : null }));
    await Topic.updateOne({ slug: topic.slug }, { $set: topic }, { upsert: true });

    // Admin-owned rows (added, edited or hidden in the admin page) are left alone.
    const [adminLessons, adminQuestions] = await Promise.all([
      Lesson.distinct('key', { topicSlug: topic.slug, origin: 'admin' }),
      Question.distinct('key', { topicSlug: topic.slug, origin: 'admin' }),
    ]);
    const lockedLessons = new Set<string>(adminLessons);
    const lockedQuestions = new Set<string>(adminQuestions);
    const seedLessons = lessons.filter((l) => !lockedLessons.has(l.key));
    const seedQuestions = questions.filter((q) => !lockedQuestions.has(q.key));

    if (seedLessons.length) {
      await Lesson.bulkWrite(
        // Seed types are plain arrays; mongoose's inferred types want DocumentArray.
        seedLessons.map((l) => ({ updateOne: { filter: { key: l.key }, update: { $set: l as unknown as Record<string, unknown> }, upsert: true } }))
      );
    }
    if (seedQuestions.length) {
      await Question.bulkWrite(
        seedQuestions.map((q) => ({ updateOne: { filter: { key: q.key }, update: { $set: q as unknown as Record<string, unknown> }, upsert: true } }))
      );
    }

    report.push(`${topic.slug}: ${lessons.length} lessons, ${questions.length} questions`);
  }

  // Stale rows are removed only after every topic is written: a lesson moved to
  // another category (npm run categorize) keeps its key and its answer stats.
  const lessonKeys = bundles.flatMap((b) => b.lessons.map((l) => l.key));
  const questionKeys = bundles.flatMap((b) => b.questions.map((q) => q.key));
  const adminLessons: string[] = await Lesson.distinct('key', { origin: 'admin' });
  const [staleLessons, staleQuestions] = await Promise.all([
    Lesson.deleteMany({ origin: { $ne: 'admin' }, key: { $nin: lessonKeys } }),
    Question.deleteMany({
      origin: { $ne: 'admin' },
      // Questions of admin lessons are admin content even if marked otherwise.
      lessonKey: { $nin: adminLessons },
      key: { $nin: questionKeys },
    }),
  ]);
  if (staleLessons.deletedCount || staleQuestions.deletedCount) {
    report.push(`removed ${staleLessons.deletedCount} lessons, ${staleQuestions.deletedCount} questions`);
  }

  // Past attempts follow their lesson to its current category.
  const moves = bundles.flatMap((b) => b.lessons.map((l) => ({ lessonKey: l.key, topicSlug: b.topic.slug })));
  const moved = await Attempt.bulkWrite(
    moves.map((m) => ({ updateMany: { filter: { lessonKey: m.lessonKey, topicSlug: { $ne: m.topicSlug } }, update: { $set: { topicSlug: m.topicSlug } } } }))
  );
  if (moved.modifiedCount) report.push(`moved ${moved.modifiedCount} attempts to their new category`);

  // Seed categories that are no longer in the arrangement and hold no admin lessons.
  const slugs = bundles.map((b) => b.topic.slug);
  const adminTopics: string[] = await Lesson.distinct('topicSlug', { origin: 'admin' });
  const staleTopics = await Topic.deleteMany({ origin: { $ne: 'admin' }, slug: { $nin: [...slugs, ...adminTopics] } });
  if (staleTopics.deletedCount) report.push(`removed ${staleTopics.deletedCount} empty categories`);
  return report;
};
