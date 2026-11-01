import { Router } from 'express';
import { z } from 'zod';
import { Attempt } from './attempt.model';
import { Question } from '../question/question.model';
import { Lesson } from '../lesson/lesson.model';
import { HttpError, objectId, parse } from '../shared/validate';
import { rateLimit } from '../../middlewares/rateLimit';
import { optionalAuth } from '../auth/auth';

const router = Router();

const attemptBody = z.object({
  topicSlug: z.string().min(1),
  lessonKey: z.string().nullish(),
  answers: z.array(z.object({ questionId: objectId, choice: z.number().int().min(0) })).min(1).max(30),
  durationMs: z.number().int().min(0).max(6 * 60 * 60 * 1000).default(0),
});

// Finish a quiz. The score is recomputed here from the stored answers — the
// client's own count is never trusted.
router.post('/', rateLimit({ windowMs: 60_000, max: 20 }), optionalAuth, async (req, res) => {
  const { topicSlug, lessonKey, answers, durationMs } = parse(attemptBody, req.body);

  const ids = [...new Set(answers.map((a) => a.questionId))];
  const questions = await Question.find({ _id: { $in: ids }, topicSlug })
    .select('+answer lessonKey difficulty')
    .lean();
  if (questions.length !== ids.length) throw new HttpError(400, 'answers: unknown question for this topic');

  const byId = new Map(questions.map((q) => [String(q._id), q]));
  const chosen = new Map(answers.map((a) => [a.questionId, a.choice]));
  const items = ids.map((id) => {
    const q = byId.get(id)!;
    const choice = chosen.get(id)!;
    return { questionId: q._id, lessonKey: q.lessonKey, difficulty: q.difficulty ?? 1, choice, correct: choice === q.answer };
  });
  const score = items.filter((i) => i.correct).length;
  const total = ids.length;
  const percent = Math.round((score / total) * 100);

  // "Better than X% of players" compares against earlier runs only.
  const [earlier, lower] = await Promise.all([
    Attempt.countDocuments({ topicSlug }),
    Attempt.countDocuments({ topicSlug, percent: { $lt: percent } }),
  ]);
  await Attempt.create({
    topicSlug,
    lessonKey: lessonKey ?? null,
    score,
    total,
    percent,
    durationMs,
    ...(req.user && { userId: req.user.id, items }),
  });

  // Per-lesson result of this run — the result card names the weakest one.
  const perLesson = new Map<string, { correct: number; total: number }>();
  for (const i of items) {
    const row = perLesson.get(i.lessonKey) ?? { correct: 0, total: 0 };
    row.total += 1;
    row.correct += i.correct ? 1 : 0;
    perLesson.set(i.lessonKey, row);
  }
  const titles = await Lesson.find({ key: { $in: [...perLesson.keys()] } }).select('key title').lean();
  const breakdown = titles
    .map((l) => ({ lessonKey: l.key, title: l.title, ...perLesson.get(l.key)! }))
    .sort((a, b) => a.correct / a.total - b.correct / b.total);

  res.status(201).json({
    score,
    total,
    percent,
    betterThan: earlier ? Math.round((lower / earlier) * 100) : null,
    plays: earlier + 1,
    saved: !!req.user,
    breakdown,
  });
});

export default router;
