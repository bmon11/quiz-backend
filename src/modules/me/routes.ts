import { Router } from 'express';
import mongoose from 'mongoose';
import { Attempt } from '../attempt/attempt.model';
import { Lesson } from '../lesson/lesson.model';
import { Question, servable } from '../question/question.model';
import { Topic } from '../topic/topic.model';
import { requireAuth } from '../auth/auth';

const router = Router();

/** Fewer answers than this and a lesson is "not enough data", not weak or strong. */
export const MIN_ANSWERS = 3;
const WEAK = 60;
const STRONG = 85;

const pct = (correct: number, total: number) => (total ? Math.round((correct / total) * 100) : 0);

export const levelOf = (accuracy: number, answered: number) =>
  answered < MIN_ANSWERS ? 'new' : accuracy < WEAK ? 'weak' : accuracy >= STRONG ? 'strong' : 'ok';

/**
 * The signed-in player's learning report: totals, accuracy per category and
 * per lesson, by difficulty, a score trend, the lessons to improve (weakest
 * first, recent answers weigh the most), lessons not tried yet in the
 * categories they play, and questions they missed last time.
 */
router.get('/analysis', requireAuth, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user!.id);

  const [summary, lessonRows, difficultyRows, recent, days] = await Promise.all([
    Attempt.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          attempts: { $sum: 1 },
          answered: { $sum: '$total' },
          correct: { $sum: '$score' },
          timeMs: { $sum: '$durationMs' },
          first: { $min: '$createdAt' },
          last: { $max: '$createdAt' },
        },
      },
    ]),
    Attempt.aggregate([
      { $match: { userId } },
      { $sort: { createdAt: 1 } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.lessonKey',
          topicSlug: { $first: '$topicSlug' },
          answered: { $sum: 1 },
          correct: { $sum: { $cond: ['$items.correct', 1, 0] } },
          // Last 10 answers in this lesson, newest last — "recent" accuracy.
          history: { $push: '$items.correct' },
          last: { $max: '$createdAt' },
        },
      },
    ]),
    Attempt.aggregate([
      { $match: { userId } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.difficulty',
          answered: { $sum: 1 },
          correct: { $sum: { $cond: ['$items.correct', 1, 0] } },
        },
      },
    ]),
    Attempt.find({ userId }).sort({ createdAt: -1 }).limit(30).select('topicSlug lessonKey score total percent durationMs createdAt items').lean(),
    Attempt.aggregate([
      { $match: { userId } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'Asia/Ulaanbaatar' } } } },
      { $sort: { _id: -1 } },
      { $limit: 400 },
    ]),
  ]);

  const playedTopics = [...new Set([...lessonRows.map((r) => r.topicSlug), ...recent.map((a) => a.topicSlug)])];
  const [topics, lessons] = await Promise.all([
    Topic.find().sort({ order: 1 }).select('slug title color icon').lean(),
    Lesson.find({ topicSlug: { $in: playedTopics } }).sort({ order: 1 }).select('key topicSlug title order').lean(),
  ]);
  const topicOf = new Map(topics.map((t) => [t.slug, t]));
  const lessonOf = new Map(lessons.map((l) => [l.key, l]));

  const byLesson = lessonRows
    .filter((r) => lessonOf.has(r._id))
    .map((r) => {
      const recentAnswers: boolean[] = r.history.slice(-10);
      const accuracy = pct(r.correct, r.answered);
      const recentAccuracy = pct(recentAnswers.filter(Boolean).length, recentAnswers.length);
      return {
        lessonKey: r._id as string,
        topicSlug: lessonOf.get(r._id)!.topicSlug,
        title: lessonOf.get(r._id)!.title,
        answered: r.answered as number,
        correct: r.correct as number,
        accuracy,
        recentAccuracy,
        level: levelOf(recentAccuracy, r.answered),
        last: r.last as Date,
      };
    });

  const byTopic = playedTopics
    .filter((slug) => topicOf.has(slug))
    .map((slug) => {
      const rows = byLesson.filter((l) => l.topicSlug === slug);
      const answered = rows.reduce((n, r) => n + r.answered, 0);
      const correct = rows.reduce((n, r) => n + r.correct, 0);
      const t = topicOf.get(slug)!;
      return {
        slug,
        title: t.title,
        color: t.color,
        icon: t.icon,
        answered,
        correct,
        accuracy: pct(correct, answered),
        lessonsTried: rows.length,
        lessonsTotal: lessons.filter((l) => l.topicSlug === slug).length,
      };
    })
    .sort((a, b) => b.answered - a.answered);

  // Weakest recent accuracy first; among equals, the lesson with more evidence.
  const improve = byLesson
    .filter((l) => l.level === 'weak' || (l.level === 'ok' && l.recentAccuracy < 75))
    .sort((a, b) => a.recentAccuracy - b.recentAccuracy || b.answered - a.answered)
    .slice(0, 6);
  const strengths = byLesson
    .filter((l) => l.level === 'strong')
    .sort((a, b) => b.recentAccuracy - a.recentAccuracy || b.answered - a.answered)
    .slice(0, 6);
  const tried = new Set(byLesson.map((l) => l.lessonKey));
  const untried = lessons
    .filter((l) => !tried.has(l.key))
    .slice(0, 6)
    .map((l) => ({ lessonKey: l.key, topicSlug: l.topicSlug, title: l.title }));

  // Questions whose latest answer was wrong (and not answered right since).
  const latest = new Map<string, boolean>();
  for (const a of recent) for (const i of a.items ?? []) {
    const id = String(i.questionId);
    if (!latest.has(id)) latest.set(id, i.correct);
  }
  const missedIds = [...latest].filter(([, ok]) => !ok).map(([id]) => id).slice(0, 12);
  const missedQs = await Question.find({ _id: { $in: missedIds }, ...servable })
    .select('+answer topicSlug lessonKey prompt choices explanation')
    .lean();
  const missed = missedIds
    .map((id) => missedQs.find((q) => String(q._id) === id))
    .filter(Boolean)
    .map((q) => ({
      id: String(q!._id),
      topicSlug: q!.topicSlug,
      lessonKey: q!.lessonKey,
      prompt: q!.prompt,
      answer: q!.choices[q!.answer],
      explanation: q!.explanation,
    }));

  // Days in a row with at least one quiz, ending today or yesterday (Ulaanbaatar time).
  const dayList: string[] = days.map((d) => d._id);
  const ubDay = (offset: number) =>
    new Date(Date.now() + 8 * 3600_000 - offset * 86400_000).toISOString().slice(0, 10);
  let streak = 0;
  if (dayList[0] === ubDay(0) || dayList[0] === ubDay(1)) {
    const start = dayList[0] === ubDay(0) ? 0 : 1;
    while (dayList[streak] === ubDay(start + streak)) streak += 1;
  }

  const s = summary[0];
  res.json({
    totals: {
      attempts: s?.attempts ?? 0,
      answered: s?.answered ?? 0,
      correct: s?.correct ?? 0,
      accuracy: pct(s?.correct ?? 0, s?.answered ?? 0),
      timeMs: s?.timeMs ?? 0,
      activeDays: dayList.length,
      streak,
      first: s?.first ?? null,
      last: s?.last ?? null,
    },
    byTopic,
    byLesson: byLesson.sort((a, b) => a.recentAccuracy - b.recentAccuracy),
    byDifficulty: [1, 2, 3].map((d) => {
      const row = difficultyRows.find((r) => r._id === d);
      return { difficulty: d, answered: row?.answered ?? 0, accuracy: pct(row?.correct ?? 0, row?.answered ?? 0) };
    }),
    trend: recent
      .slice(0, 20)
      .reverse()
      .map((a) => ({ at: a.createdAt, percent: a.percent, topicSlug: a.topicSlug })),
    recent: recent.slice(0, 10).map((a) => ({
      id: String(a._id),
      topicSlug: a.topicSlug,
      topicTitle: topicOf.get(a.topicSlug)?.title ?? null,
      lessonKey: a.lessonKey,
      lessonTitle: a.lessonKey ? (lessonOf.get(a.lessonKey)?.title ?? null) : null,
      score: a.score,
      total: a.total,
      percent: a.percent,
      durationMs: a.durationMs,
      at: a.createdAt,
    })),
    improve,
    strengths,
    untried,
    missed,
  });
});

export default router;
