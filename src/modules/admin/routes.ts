import { Router } from 'express';
import { z } from 'zod';
import { Topic } from '../topic/topic.model';
import { Lesson } from '../lesson/lesson.model';
import { Question } from '../question/question.model';
import { requireAdmin } from '../auth/auth';
import { HttpError, objectId, parse } from '../shared/validate';

// Content editing for admins (ADMIN_EMAILS or role "admin"). What admins add
// is stored with origin "admin" and the seed never touches it; editing a seed
// question hands it over to the admin the same way, and deleting one hides it.

const router = Router();
router.use(requireAdmin);

/** Slugs that are pages of the web app, so a category can't shadow them. */
const RESERVED = new Set(['login', 'register', 'me', 'admin', 'api', 'auth', 'quiz', '_next']);

const text = (max: number) => z.string().trim().max(max);
const L = (max = 300, required = true) =>
  z
    .object({ en: text(max).default(''), mn: text(max).default('') })
    .refine((v) => !required || v.en || v.mn, 'needs English or Mongolian text');
const slug = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'use a-z, 0-9 and dashes')
  .max(40);
const color = z.string().regex(/^#[0-9a-f]{6}$/i, 'hex colour like #FF6B35');

/** Missing language falls back to the other, so the app never shows a blank. */
const both = (v: { en: string; mn: string }) => ({ en: v.en || v.mn, mn: v.mn || v.en });

// ── categories (topics) ─────────────────────────────────────────────────

const topicBody = z.object({
  slug,
  title: L(80),
  tagline: L(140, false).default({ en: '', mn: '' }),
  description: L(400, false).default({ en: '', mn: '' }),
  color: color.default('#00A76F'),
  icon: text(80).default('solar:star-bold-duotone'),
  order: z.number().int().min(0).max(999).optional(),
});

router.get('/topics', async (_req, res) => {
  const [topics, lessons, questions] = await Promise.all([
    Topic.find().sort({ order: 1 }).lean(),
    Lesson.find().sort({ order: 1 }).select('key topicSlug title summary body visual order origin').lean(),
    Question.aggregate([{ $match: { hidden: { $ne: true } } }, { $group: { _id: '$lessonKey', n: { $sum: 1 } } }]),
  ]);
  const count = new Map(questions.map((r) => [r._id, r.n]));
  res.json(
    topics.map((t) => ({
      ...t,
      lessons: lessons
        .filter((l) => l.topicSlug === t.slug)
        // Only admin lessons are editable here, so only they need their cards.
        .map(({ visual, ...l }) => ({ ...l, ...(l.origin === 'admin' && { visual }), questionCount: count.get(l.key) ?? 0 })),
    }))
  );
});

router.post('/topics', async (req, res) => {
  const body = parse(topicBody, req.body);
  if (RESERVED.has(body.slug)) throw new HttpError(400, 'slug: this word is reserved');
  if (await Topic.exists({ slug: body.slug })) throw new HttpError(409, 'A category with this slug already exists');
  const last = await Topic.findOne().sort({ order: -1 }).select('order').lean();
  const topic = await Topic.create({
    ...body,
    title: both(body.title),
    tagline: both(body.tagline),
    description: both(body.description),
    order: body.order ?? (last?.order ?? 0) + 1,
    origin: 'admin',
  });
  res.status(201).json(topic);
});

const ownedTopic = async (slugValue: string) => {
  const topic = await Topic.findOne({ slug: slugValue });
  if (!topic) throw new HttpError(404, 'Category not found');
  if (topic.origin !== 'admin') throw new HttpError(409, 'Built-in categories are edited in the seed files');
  return topic;
};

router.patch('/topics/:slug', async (req, res) => {
  const topic = await ownedTopic(req.params.slug as string);
  const body = parse(topicBody.omit({ slug: true }).partial(), req.body);
  for (const k of ['title', 'tagline', 'description'] as const) if (body[k]) (body as any)[k] = both(body[k]!);
  topic.set(body);
  await topic.save();
  res.json(topic);
});

router.delete('/topics/:slug', async (req, res) => {
  const topic = await ownedTopic(req.params.slug as string);
  await Promise.all([
    Question.deleteMany({ topicSlug: topic.slug }),
    Lesson.deleteMany({ topicSlug: topic.slug }),
    topic.deleteOne(),
  ]);
  res.json({ ok: true });
});

// ── lessons (sub-categories) ───────────────────────────────────────────

const lessonBody = z.object({
  topicSlug: slug,
  name: slug,
  title: L(120),
  summary: L(240, false).default({ en: '', mn: '' }),
  body: L(2000, false).default({ en: '', mn: '' }),
  funFacts: z.array(L(300)).max(10).default([]),
  cards: z
    .array(z.object({ icon: text(40).default(''), title: L(80), facts: z.array(L(200)).max(6).default([]) }))
    .max(12)
    .default([]),
  order: z.number().int().min(0).max(999).optional(),
});

const lessonFields = (body: Partial<z.infer<typeof lessonBody>>) => ({
  ...(body.title && { title: both(body.title) }),
  ...(body.summary && { summary: both(body.summary) }),
  ...(body.body && { body: both(body.body) }),
  ...(body.funFacts && { funFacts: body.funFacts.map(both) }),
  ...(body.cards && {
    visual: {
      kind: 'cards',
      items: body.cards.map((c) => ({ icon: c.icon, title: both(c.title), facts: c.facts.map(both) })),
    },
  }),
  ...(body.order !== undefined && { order: body.order }),
});

router.post('/lessons', async (req, res) => {
  const body = parse(lessonBody, req.body);
  if (!(await Topic.exists({ slug: body.topicSlug }))) throw new HttpError(404, 'Category not found');
  const key = `${body.topicSlug}.${body.name}`;
  if (await Lesson.exists({ key })) throw new HttpError(409, 'A lesson with this name already exists');
  const last = await Lesson.findOne({ topicSlug: body.topicSlug }).sort({ order: -1 }).select('order').lean();
  const lesson = await Lesson.create({
    topicSlug: body.topicSlug,
    key,
    summary: { en: '', mn: '' },
    body: { en: '', mn: '' },
    visual: { kind: 'cards', items: [] },
    ...lessonFields(body),
    order: body.order ?? (last?.order ?? 0) + 1,
    origin: 'admin',
  });
  res.status(201).json(lesson);
});

const ownedLesson = async (key: string) => {
  const lesson = await Lesson.findOne({ key });
  if (!lesson) throw new HttpError(404, 'Lesson not found');
  if (lesson.origin !== 'admin') throw new HttpError(409, 'Built-in lessons are edited in the seed files');
  return lesson;
};

router.patch('/lessons/:key', async (req, res) => {
  const lesson = await ownedLesson(req.params.key as string);
  lesson.set(lessonFields(parse(lessonBody.omit({ topicSlug: true, name: true }).partial(), req.body)));
  await lesson.save();
  res.json(lesson);
});

router.delete('/lessons/:key', async (req, res) => {
  const lesson = await ownedLesson(req.params.key as string);
  await Promise.all([Question.deleteMany({ lessonKey: lesson.key }), lesson.deleteOne()]);
  res.json({ ok: true });
});

// ── questions ──────────────────────────────────────────────────────────

const questionFields = z.object({
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
  prompt: L(500),
  choices: z.array(L(160)).length(4, 'needs exactly 4 choices'),
  answer: z.number().int().min(0).max(3),
  explanation: L(800, false).default({ en: '', mn: '' }),
});
const questionBody = questionFields.extend({ lessonKey: z.string().min(3).max(120) });

const listQuery = z.object({
  topic: z.string().optional(),
  lesson: z.string().optional(),
  q: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(30),
});

const escapeRe = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.get('/questions', async (req, res) => {
  const { topic, lesson, q, page, limit } = parse(listQuery, req.query);
  const match: Record<string, unknown> = { hidden: { $ne: true } };
  if (topic) match.topicSlug = topic;
  if (lesson) match.lessonKey = lesson;
  if (q) {
    const re = new RegExp(escapeRe(q), 'i');
    match.$or = [{ 'prompt.en': re }, { 'prompt.mn': re }];
  }
  const [rows, total] = await Promise.all([
    Question.find(match)
      .select('+answer')
      .sort({ origin: 1, updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(match),
  ]);
  res.json({ total, page, questions: rows.map(({ _id, ...rest }) => ({ id: String(_id), ...rest })) });
});

const prepared = (body: z.infer<typeof questionFields>) => ({
  ...body,
  prompt: both(body.prompt),
  choices: body.choices.map(both),
  explanation: both(body.explanation),
});

const lessonFor = async (lessonKey: string) => {
  const lesson = await Lesson.findOne({ key: lessonKey }).select('key topicSlug').lean();
  if (!lesson) throw new HttpError(404, 'Lesson not found');
  return lesson;
};

const newKey = (lessonKey: string, i = 0) =>
  `${lessonKey}.u${Date.now().toString(36)}${i ? `-${i}` : ''}${Math.random().toString(36).slice(2, 5)}`;

router.post('/questions', async (req, res) => {
  const body = parse(questionBody, req.body);
  const lesson = await lessonFor(body.lessonKey);
  const question = await Question.create({
    ...prepared(body),
    topicSlug: lesson.topicSlug,
    lessonKey: lesson.key,
    key: newKey(lesson.key),
    origin: 'admin',
  });
  res.status(201).json({ id: String(question._id) });
});

/** Paste many at once (the admin page's JSON import). All or nothing. */
router.post('/questions/bulk', async (req, res) => {
  const { lessonKey, questions } = parse(
    z.object({ lessonKey: z.string().min(3).max(120), questions: z.array(questionFields).min(1).max(200) }),
    req.body
  );
  const lesson = await lessonFor(lessonKey);
  const docs = questions.map((q, i) => ({
    ...prepared(q),
    topicSlug: lesson.topicSlug,
    lessonKey: lesson.key,
    key: newKey(lesson.key, i + 1),
    origin: 'admin',
  }));
  await Question.insertMany(docs);
  res.status(201).json({ inserted: docs.length });
});

router.patch('/questions/:id', async (req, res) => {
  const id = parse(objectId, req.params.id);
  const body = parse(questionBody.partial(), req.body);
  const question = await Question.findById(id);
  if (!question) throw new HttpError(404, 'Question not found');
  const lesson = body.lessonKey ? await lessonFor(body.lessonKey) : null;
  const { lessonKey: _ignored, ...fields } = body;
  question.set({
    ...fields,
    ...(fields.prompt && { prompt: both(fields.prompt) }),
    ...(fields.choices && { choices: fields.choices.map(both) }),
    ...(fields.explanation && { explanation: both(fields.explanation) }),
    ...(lesson && { lessonKey: lesson.key, topicSlug: lesson.topicSlug }),
    origin: 'admin',
  });
  await question.save();
  res.json({ id });
});

router.delete('/questions/:id', async (req, res) => {
  const id = parse(objectId, req.params.id);
  const question = await Question.findById(id).select('origin');
  if (!question) throw new HttpError(404, 'Question not found');
  // A seed question would come back on the next seed, so it is hidden instead.
  if (question.origin === 'admin') await question.deleteOne();
  else await Question.updateOne({ _id: id }, { $set: { hidden: true, origin: 'admin' } });
  res.json({ ok: true });
});

export default router;
