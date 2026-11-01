import { Router } from 'express';
import { z } from 'zod';
import { Question, servable } from './question.model';
import { Topic } from '../topic/topic.model';
import { Lesson } from '../lesson/lesson.model';
import { HttpError, objectId, parse } from '../shared/validate';
import { rateLimit } from '../../middlewares/rateLimit';

const router = Router();

const rateOf = (stats?: { attempts?: number | null; correct?: number | null } | null) =>
  stats?.attempts ? Math.round(((stats.correct ?? 0) / stats.attempts) * 100) : null;

const quizQuery = z.object({
  topic: z.string().min(1),
  lesson: z.string().optional(),
  count: z.coerce.number().int().min(1).max(30).default(10),
});

// A fresh random set each time. `answer` is excluded by the schema (select: false).
router.get('/', async (req, res) => {
  const { topic, lesson, count } = parse(quizQuery, req.query);
  const match: Record<string, unknown> = { topicSlug: topic, ...servable };
  if (lesson) match.lessonKey = lesson;

  const rows = await Question.aggregate([
    { $match: match },
    { $sample: { size: count } },
    { $project: { answer: 0, explanation: 0, createdAt: 0, updatedAt: 0, __v: 0, origin: 0, hidden: 0 } },
  ]);
  if (!rows.length) throw new HttpError(404, 'No questions for this quiz');

  res.json({
    questions: rows.map(({ _id, stats, ...q }) => ({ id: String(_id), ...q, correctRate: rateOf(stats) })),
  });
});

const deckQuery = z.object({
  topic: z.string().min(1),
  lesson: z.string().optional(),
  count: z.coerce.number().int().min(1).max(30).default(10),
});

/**
 * Everything one swipeable quiz story needs, in one call (like sedev's
 * /topics/:id for its reader): the questions in a fresh random order, the
 * lesson either side (swipe up / down opens their quiz), and — when the
 * questions are about the family-tree people — the family graph so each
 * answer can show its branch. A lesson deck has all of the lesson's questions;
 * without `lesson` it is `count` random questions from the whole topic.
 */
router.get('/deck', async (req, res) => {
  const { topic: slug, lesson: lessonKey, count } = parse(deckQuery, req.query);
  const [topic, lessons] = await Promise.all([
    Topic.findOne({ slug }).select('slug title color icon').lean(),
    Lesson.find({ topicSlug: slug }).sort({ order: 1 }).select('key title order visual').lean(),
  ]);
  if (!topic) throw new HttpError(404, 'Topic not found');

  const at = lessonKey ? lessons.findIndex((l) => l.key === lessonKey) : -1;
  if (lessonKey && at < 0) throw new HttpError(404, 'Lesson not found');

  const match: Record<string, unknown> = { topicSlug: slug, ...servable };
  if (lessonKey) match.lessonKey = lessonKey;
  const size = lessonKey ? 30 : count;
  const rows = await Question.aggregate([
    { $match: match },
    { $sample: { size } },
    { $project: { answer: 0, explanation: 0, createdAt: 0, updatedAt: 0, __v: 0, origin: 0, hidden: 0 } },
  ]);
  if (!rows.length) throw new HttpError(404, 'No questions for this quiz');

  const brief = (l?: (typeof lessons)[number]) => (l ? { key: l.key, title: l.title } : null);
  const family = rows.some((q) => q.gods?.length)
    ? (lessons.find((l) => (l.visual as { kind?: string })?.kind === 'family')?.visual ?? null)
    : null;

  res.json({
    topic,
    lesson: at >= 0 ? { ...brief(lessons[at]), order: at + 1, total: lessons.length } : null,
    prev: at > 0 ? brief(lessons[at - 1]) : null,
    next: at >= 0 ? brief(lessons[at + 1]) : null,
    family,
    questions: rows.map(({ _id, stats, ...q }) => ({ id: String(_id), ...q, correctRate: rateOf(stats) })),
  });
});

const answerBody = z.object({ questionId: objectId, choice: z.number().int().min(0).max(9) });

// Check one answer, reveal the right one + the explanation, and count it.
router.post('/answer', rateLimit({ windowMs: 60_000, max: 120 }), async (req, res) => {
  const { questionId, choice } = parse(answerBody, req.body);
  const found = await Question.findById(questionId).select('+answer choices').lean();
  if (!found) throw new HttpError(404, 'Question not found');
  if (choice >= found.choices.length) throw new HttpError(400, 'choice: out of range');

  const correct = choice === found.answer;
  const updated = await Question.findByIdAndUpdate(
    questionId,
    { $inc: { 'stats.attempts': 1, 'stats.correct': correct ? 1 : 0 } },
    { new: true, projection: { stats: 1, explanation: 1 } }
  ).lean();

  res.json({
    correct,
    answer: found.answer,
    explanation: updated?.explanation,
    correctRate: rateOf(updated?.stats),
  });
});

export default router;
