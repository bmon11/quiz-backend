import { Router } from 'express';
import { z } from 'zod';
import { Question, playerProjection, servable } from '../question/question.model';
import { Lesson } from '../lesson/lesson.model';
import { Topic } from '../topic/topic.model';
import { HttpError, objectId, parse } from '../shared/validate';
import { rateLimit } from '../../middlewares/rateLimit';

// Jeopardy: a board of lessons (columns) × 5 clues of rising value. The game
// itself runs in the browser; the server deals the board and checks answers
// without revealing the right one on a miss, so another team can still steal.

const router = Router();

export const VALUES = [200, 400, 600, 800, 1000];
const ROWS = VALUES.length;

const boardQuery = z.object({
  topics: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 30) : [])),
  columns: z.coerce.number().int().min(2).max(8).default(6),
});

const shuffle = <T>(list: T[]) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/**
 * 0 (easy) … 1 (hard). The written difficulty, blended with how players really
 * do once a question has a few answers.
 */
export const hardness = (q: { difficulty?: number | null; stats?: { attempts?: number | null; correct?: number | null } | null }) => {
  const written = ((q.difficulty ?? 1) - 1) / 2;
  const attempts = q.stats?.attempts ?? 0;
  if (attempts < 3) return written;
  const missRate = 1 - (q.stats?.correct ?? 0) / attempts;
  return written * 0.4 + missRate * 0.6;
};

/** Picks `ROWS` questions spread from easiest to hardest. */
export const ladder = <T extends Parameters<typeof hardness>[0]>(pool: T[]) => {
  const sorted = [...pool].sort((a, b) => hardness(a) - hardness(b));
  if (sorted.length <= ROWS) return sorted;
  return VALUES.map((_, i) => sorted[Math.round((i * (sorted.length - 1)) / (ROWS - 1))]);
};

router.get('/board', async (req, res) => {
  const { topics, columns } = parse(boardQuery, req.query);
  const match: Record<string, unknown> = { ...servable };
  if (topics.length) match.topicSlug = { $in: topics };

  // Lessons with enough questions for a full column.
  const counts = await Question.aggregate([
    { $match: match },
    { $group: { _id: '$lessonKey', topicSlug: { $first: '$topicSlug' }, n: { $sum: 1 } } },
    { $match: { n: { $gte: ROWS } } },
  ]);
  if (counts.length < 2) throw new HttpError(404, 'Not enough questions for a board — pick more categories');

  // Round-robin over topics so one big category doesn't fill the board.
  const byTopic = new Map<string, string[]>();
  for (const row of shuffle(counts)) byTopic.set(row.topicSlug, [...(byTopic.get(row.topicSlug) ?? []), row._id]);
  const picked: string[] = [];
  const queues = shuffle([...byTopic.values()]);
  while (picked.length < columns && queues.some((q) => q.length)) {
    for (const queue of queues) if (queue.length && picked.length < columns) picked.push(queue.shift()!);
  }

  const [lessons, topicDocs, pools] = await Promise.all([
    Lesson.find({ key: { $in: picked } }).select('key topicSlug title').lean(),
    Topic.find({ slug: { $in: [...byTopic.keys()] } }).select('slug title color icon').lean(),
    Promise.all(
      picked.map((key) =>
        Question.aggregate([
          { $match: { ...servable, lessonKey: key } },
          { $sample: { size: 15 } },
          { $project: { ...playerProjection, source: 0, gods: 0 } },
        ])
      )
    ),
  ]);
  const lessonBy = new Map(lessons.map((l) => [l.key, l]));
  const topicBy = new Map(topicDocs.map((t) => [t.slug, t]));

  const board = picked
    .map((key, col) => {
      const lesson = lessonBy.get(key);
      if (!lesson) return null;
      const topic = topicBy.get(lesson.topicSlug);
      return {
        lessonKey: key,
        title: lesson.title,
        topic: topic ? { slug: topic.slug, title: topic.title, color: topic.color, icon: topic.icon } : null,
        clues: ladder(pools[col]).map(({ _id, stats: _s, ...q }, row) => ({
          value: VALUES[row],
          question: { id: String(_id), ...q },
        })),
      };
    })
    .filter(Boolean);

  // One Daily Double, never on the cheapest row.
  const ddCol = Math.floor(Math.random() * board.length);
  res.json({
    values: VALUES,
    columns: board,
    dailyDouble: { col: ddCol, row: 1 + Math.floor(Math.random() * (ROWS - 1)) },
  });
});

const checkBody = z.object({
  questionId: objectId,
  // No choice = "show the answer" (nobody got it).
  choice: z.number().int().min(0).max(9).optional(),
  // The first try at this clue counts toward the question's stats; steals don't.
  first: z.boolean().default(false),
});

router.post('/check', rateLimit({ windowMs: 60_000, max: 150 }), async (req, res) => {
  const { questionId, choice, first } = parse(checkBody, req.body);
  const found = await Question.findById(questionId).select('+answer choices explanation map').lean();
  if (!found) throw new HttpError(404, 'Question not found');
  if (choice !== undefined && choice >= found.choices.length) throw new HttpError(400, 'choice: out of range');

  const correct = choice !== undefined && choice === found.answer;
  if (choice !== undefined && first) {
    await Question.updateOne({ _id: questionId }, { $inc: { 'stats.attempts': 1, 'stats.correct': correct ? 1 : 0 } });
  }
  const reveal = correct || choice === undefined;
  res.json({ correct, ...(reveal && { answer: found.answer, explanation: found.explanation, map: found.map ?? null }) });
});

export default router;
