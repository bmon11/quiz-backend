import { Router } from 'express';
import { z } from 'zod';
import { Question } from '../question/question.model';
import { Lesson } from '../lesson/lesson.model';
import { requireRole } from '../auth/auth';
import { HttpError, objectId, parse } from '../shared/validate';

// Players' "this is wrong" reports, for editors. A report lives on its question;
// resolving closes every open report on that question at once.

const router = Router();
router.use(requireRole('editor'));

const listQuery = z.object({
  status: z.enum(['open', 'closed']).default('open'),
  topic: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

router.get('/', async (req, res) => {
  const { status, topic, page, limit } = parse(listQuery, req.query);
  const match: Record<string, unknown> =
    status === 'open' ? { openReports: { $gt: 0 } } : { 'reports.status': { $in: ['fixed', 'dismissed'] }, openReports: 0 };
  if (topic) match.topicSlug = topic;
  const [rows, total, openTotal] = await Promise.all([
    Question.find(match)
      .select('+answer +reports')
      .sort(status === 'open' ? { openReports: -1, updatedAt: -1 } : { updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(match),
    Question.countDocuments({ openReports: { $gt: 0 } }),
  ]);
  const lessons = await Lesson.find({ key: { $in: [...new Set(rows.map((r) => r.lessonKey))] } })
    .select('key title')
    .lean();
  const titles = new Map(lessons.map((l) => [l.key, l.title]));
  res.json({
    total,
    openTotal,
    page,
    questions: rows.map(({ _id, reports, ...q }) => ({
      id: String(_id),
      ...q,
      lessonTitle: titles.get(q.lessonKey) ?? null,
      // Newest first; the closed tab shows the last few for context.
      reports: (reports ?? [])
        .filter((r) => (status === 'open' ? r.status === 'open' : r.status !== 'open'))
        .reverse()
        .slice(0, 20)
        .map(({ reporter: _hidden, _id: rid, ...r }) => ({ id: String(rid), ...r })),
    })),
  });
});

const resolveBody = z.object({
  status: z.enum(['fixed', 'dismissed']),
  // "Accept suggestion": set the right answer while closing.
  answer: z.number().int().min(0).max(9).optional(),
});

router.patch('/:id', async (req, res) => {
  const id = parse(objectId, req.params.id);
  const { status, answer } = parse(resolveBody, req.body);
  const question = await Question.findById(id).select('choices origin').lean();
  if (!question) throw new HttpError(404, 'Question not found');
  if (answer !== undefined && answer >= question.choices.length) throw new HttpError(400, 'answer: out of range');

  await Question.updateOne(
    { _id: id },
    {
      $set: {
        'reports.$[r].status': status,
        'reports.$[r].resolvedBy': req.user!.name,
        'reports.$[r].resolvedAt': new Date(),
        openReports: 0,
        // Changing a seed question's answer hands it to the admin side, like any edit.
        ...(answer !== undefined && { answer, origin: 'admin' }),
      },
    },
    { arrayFilters: [{ 'r.status': 'open' }] }
  );
  res.json({ ok: true });
});

export default router;
