import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { seedBundles } from './seed/seed';
import { Question } from './modules/question/question.model';
import { Lesson } from './modules/lesson/lesson.model';
import { setGoogleVerifier, signToken, verifyToken } from './modules/auth/auth';
import type { SeedBundle } from './seed/types';
import { clearTestDb, startTestDb, stopTestDb } from './test/setup';

const L = (en: string) => ({ en, mn: en });
const lessonOf = (key: string, order: number) => ({
  topicSlug: 't',
  key,
  order,
  title: L(key),
  summary: L('s'),
  body: L('b'),
  visual: { kind: 'cards' as const, items: [] },
  funFacts: [],
});
const mini: SeedBundle = {
  topic: { slug: 't', order: 1, color: '#000', icon: '', title: L('T'), tagline: L('t'), description: L('d') },
  lessons: [lessonOf('t.a', 1), lessonOf('t.b', 2), lessonOf('t.c', 3)],
  questions: ['a', 'b'].flatMap((l) =>
    [0, 1, 2, 3].map((i) => ({
      topicSlug: 't',
      lessonKey: `t.${l}`,
      key: `t.${l}.q${i}`,
      difficulty: ((i % 3) + 1) as 1 | 2 | 3,
      prompt: L(`${l}${i}`),
      choices: [L('w'), L('x'), L('y'), L('z')],
      answer: 0,
      explanation: L('because'),
    }))
  ),
};

const app = createApp();

beforeAll(startTestDb);
afterAll(stopTestDb);
beforeEach(async () => {
  await clearTestDb();
  await seedBundles([mini]);
  process.env.ADMIN_EMAILS = 'boss@example.com';
});
afterEach(() => setGoogleVerifier(null));

const register = async (email = 'ann@example.com') =>
  (await request(app).post('/auth/register').send({ name: 'Ann', email, password: 'secret123' })).body;

describe('auth', () => {
  it('tokens round-trip and reject tampering', () => {
    const token = signToken('64b7f0c2a1b2c3d4e5f60718');
    expect(verifyToken(token)).toBe('64b7f0c2a1b2c3d4e5f60718');
    expect(verifyToken(`${token.slice(0, -2)}xx`)).toBeNull();
  });

  it('registers, logs in and refuses a wrong password', async () => {
    const { token, user } = await register();
    expect(user).toMatchObject({ email: 'ann@example.com', role: 'user' });
    const me = await request(app).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.body.user.email).toBe('ann@example.com');

    expect((await request(app).post('/auth/register').send({ name: 'A', email: 'ANN@example.com', password: 'secret123' })).status).toBe(409);
    expect((await request(app).post('/auth/login').send({ email: 'ann@example.com', password: 'nope' })).status).toBe(401);
    const ok = await request(app).post('/auth/login').send({ email: 'Ann@Example.com', password: 'secret123' });
    expect(ok.body.token).toBeTruthy();
    expect((await request(app).get('/auth/me')).status).toBe(401);
  });

  it('Google sign-in creates the user, then links by email', async () => {
    setGoogleVerifier(async () => ({ sub: 'g-1', email: 'ann@example.com', name: 'Ann G', picture: 'https://x/p.png' }));
    const first = await request(app).post('/auth/google').send({ credential: 'fake-google-credential' });
    expect(first.body.user).toMatchObject({ email: 'ann@example.com', name: 'Ann G', avatar: 'https://x/p.png' });
    // Same email later registers a password — still one account.
    const pw = await register();
    expect(pw.user.id).toBe(first.body.user.id);
  });

  it('ADMIN_EMAILS grants admin', async () => {
    const { user } = await register('boss@example.com');
    expect(user.role).toBe('admin');
  });
});

describe('analysis', () => {
  it('saves signed-in runs with items and finds the weak lesson', async () => {
    const { token } = await register();
    const qs = await Question.find({ topicSlug: 't' }).lean();
    // Lesson a: all right. Lesson b: all wrong.
    const answers = qs.map((q) => ({ questionId: String(q._id), choice: q.lessonKey === 't.a' ? 0 : 1 }));
    const run = await request(app).post('/attempts').set('Authorization', `Bearer ${token}`).send({ topicSlug: 't', answers });
    expect(run.status).toBe(201);
    expect(run.body).toMatchObject({ score: 4, total: 8, saved: true });
    expect(run.body.breakdown[0]).toMatchObject({ lessonKey: 't.b', correct: 0, total: 4 });

    const res = await request(app).get('/me/analysis').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.totals).toMatchObject({ attempts: 1, answered: 8, correct: 4, accuracy: 50, streak: 1 });
    expect(res.body.improve.map((l: any) => l.lessonKey)).toEqual(['t.b']);
    expect(res.body.strengths.map((l: any) => l.lessonKey)).toEqual(['t.a']);
    expect(res.body.untried.map((l: any) => l.lessonKey)).toEqual(['t.c']);
    expect(res.body.byTopic[0]).toMatchObject({ slug: 't', accuracy: 50, lessonsTried: 2, lessonsTotal: 3 });
    expect(res.body.missed).toHaveLength(4);
    expect(res.body.missed[0].answer.en).toBe('w');
  });

  it('anonymous runs are not saved to anyone', async () => {
    const q = await Question.findOne().lean();
    const run = await request(app).post('/attempts').send({ topicSlug: 't', answers: [{ questionId: String(q!._id), choice: 0 }] });
    expect(run.body.saved).toBe(false);
    expect((await request(app).get('/me/analysis')).status).toBe(401);
  });
});

describe('admin', () => {
  const asAdmin = async () => `Bearer ${(await register('boss@example.com')).token}`;

  it('is closed to players', async () => {
    const { token } = await register();
    expect((await request(app).get('/admin/topics').set('Authorization', `Bearer ${token}`)).status).toBe(403);
  });

  it('creates a category, lesson and questions that the quiz serves', async () => {
    const auth = await asAdmin();
    const topic = await request(app)
      .post('/admin/topics')
      .set('Authorization', auth)
      .send({ slug: 'music', title: { en: 'Music', mn: '' }, color: '#FF0000' });
    expect(topic.status).toBe(201);
    expect(topic.body.title).toEqual({ en: 'Music', mn: 'Music' });
    expect((await request(app).post('/admin/topics').set('Authorization', auth).send({ slug: 'admin', title: L('x') })).status).toBe(400);

    const lesson = await request(app)
      .post('/admin/lessons')
      .set('Authorization', auth)
      .send({ topicSlug: 'music', name: 'rock', title: L('Rock'), cards: [{ icon: '🎸', title: L('Guitar'), facts: [L('six strings')] }] });
    expect(lesson.status).toBe(201);
    expect(lesson.body.key).toBe('music.rock');

    const one = { prompt: L('Who?'), choices: [L('a'), L('b'), L('c'), L('d')], answer: 2, explanation: L('c') };
    expect((await request(app).post('/admin/questions').set('Authorization', auth).send({ lessonKey: 'music.rock', ...one })).status).toBe(201);
    const bulk = await request(app).post('/admin/questions/bulk').set('Authorization', auth).send({ lessonKey: 'music.rock', questions: [one, one] });
    expect(bulk.body.inserted).toBe(2);
    expect((await request(app).post('/admin/questions').set('Authorization', auth).send({ lessonKey: 'music.rock', ...one, choices: [L('a')] })).status).toBe(400);

    const deck = await request(app).get('/quiz/deck').query({ topic: 'music', lesson: 'music.rock' });
    expect(deck.body.questions).toHaveLength(3);

    // Re-seeding the built-in topics leaves admin content alone.
    await seedBundles([mini]);
    expect(await Question.countDocuments({ topicSlug: 'music' })).toBe(3);
  });

  it('editing a seed question survives a re-seed; deleting one hides it', async () => {
    const auth = await asAdmin();
    await request(app).post('/admin/lessons').set('Authorization', auth).send({ topicSlug: 't', name: 'mine', title: L('Mine') });
    const [q0, q1] = await Question.find({ topicSlug: 't' }).sort({ key: 1 }).lean();
    const edit = await request(app).patch(`/admin/questions/${q0._id}`).set('Authorization', auth).send({ prompt: L('Edited') });
    expect(edit.status).toBe(200);
    expect((await request(app).delete(`/admin/questions/${q1._id}`).set('Authorization', auth)).status).toBe(200);

    await seedBundles([mini]);
    expect((await Question.findById(q0._id).lean())!.prompt.en).toBe('Edited');
    expect((await Question.findById(q1._id).lean())!.hidden).toBe(true);
    expect(await Lesson.exists({ key: 't.mine' })).toBeTruthy();

    const deck = await request(app).get('/quiz/deck').query({ topic: 't', lesson: q1.lessonKey });
    expect(deck.body.questions.map((q: any) => q.id)).not.toContain(String(q1._id));
    const list = await request(app).get('/admin/questions').query({ topic: 't', q: 'edit' }).set('Authorization', auth);
    expect(list.body.total).toBe(1);
    expect(list.body.questions[0].answer).toBe(0);
  });

  it('built-in categories are read-only', async () => {
    const auth = await asAdmin();
    expect((await request(app).patch('/admin/topics/t').set('Authorization', auth).send({ color: '#123456' })).status).toBe(409);
  });
});
