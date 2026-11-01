import { Router } from 'express';
import { Topic } from './topic.model';
import { Lesson } from '../lesson/lesson.model';
import { Question, servable } from '../question/question.model';
import { Attempt } from '../attempt/attempt.model';
import { HttpError } from '../shared/validate';

const router = Router();

const countBy = async (model: typeof Lesson | typeof Question | typeof Attempt, field: string, match = {}) => {
  const rows = await (model as any).aggregate([{ $match: match }, { $group: { _id: `$${field}`, n: { $sum: 1 } } }]);
  return new Map<string, number>(rows.map((r: { _id: string; n: number }) => [r._id, r.n]));
};

// Home page: every topic with its counts, one call.
router.get('/', async (_req, res) => {
  const [topics, lessons, questions, plays] = await Promise.all([
    Topic.find().sort({ order: 1 }).lean(),
    countBy(Lesson, 'topicSlug'),
    countBy(Question, 'topicSlug', servable),
    countBy(Attempt, 'topicSlug'),
  ]);
  res.json(
    topics.map((t) => ({
      ...t,
      lessonCount: lessons.get(t.slug) ?? 0,
      questionCount: questions.get(t.slug) ?? 0,
      plays: plays.get(t.slug) ?? 0,
    }))
  );
});

// Topic page: the topic plus all its lessons (visuals included — they are small).
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const [topic, lessons, questionCounts] = await Promise.all([
    Topic.findOne({ slug }).lean(),
    Lesson.find({ topicSlug: slug }).sort({ order: 1 }).lean(),
    Question.aggregate([{ $match: { topicSlug: slug, ...servable } }, { $group: { _id: '$lessonKey', n: { $sum: 1 } } }]),
  ]);
  if (!topic) throw new HttpError(404, 'Topic not found');
  const perLesson = new Map<string, number>(questionCounts.map((r) => [r._id, r.n]));
  res.json({
    topic,
    lessons: lessons.map((l) => ({ ...l, questionCount: perLesson.get(l.key) ?? 0 })),
  });
});

// Community stats for the results screen and the topic page.
router.get('/:slug/stats', async (req, res) => {
  const { slug } = req.params;
  const [summary, buckets, questions] = await Promise.all([
    Attempt.aggregate([
      { $match: { topicSlug: slug } },
      { $group: { _id: null, plays: { $sum: 1 }, avgPercent: { $avg: '$percent' } } },
    ]),
    Attempt.aggregate([
      { $match: { topicSlug: slug } },
      // 0–9, 10–19 … 90–100 (100 folds into the last bucket)
      { $group: { _id: { $min: [{ $floor: { $divide: ['$percent', 10] } }, 9] }, n: { $sum: 1 } } },
    ]),
    Question.find({ topicSlug: slug, ...servable, 'stats.attempts': { $gte: 3 } })
      .select('key prompt stats')
      .lean(),
  ]);

  const distribution = Array.from({ length: 10 }, (_, i) => buckets.find((b) => b._id === i)?.n ?? 0);
  const rated = questions
    .map((q) => ({ key: q.key, prompt: q.prompt, rate: Math.round((q.stats!.correct / q.stats!.attempts) * 100) }))
    .sort((a, b) => a.rate - b.rate);

  res.json({
    plays: summary[0]?.plays ?? 0,
    avgPercent: Math.round(summary[0]?.avgPercent ?? 0),
    distribution,
    hardest: rated.slice(0, 5),
  });
});

export default router;
