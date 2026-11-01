import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { seedBundles } from './seed/seed';
import { Question } from './modules/question/question.model';
import { User } from './modules/auth/user.model';
import { hardness, ladder } from './modules/jeopardy/routes';
import { hashPassword, signToken } from './modules/auth/auth';
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
  questions: ['a', 'b', 'c'].flatMap((l) =>
    [0, 1, 2, 3, 4, 5].map((i) => ({
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
const one = { prompt: L('Who?'), choices: [L('a'), L('b'), L('c'), L('d')], answer: 2, explanation: L('c') };

beforeAll(startTestDb);
afterAll(stopTestDb);
beforeEach(async () => {
  await clearTestDb();
  await seedBundles([mini]);
  process.env.ADMIN_EMAILS = 'boss@example.com';
});

/** A user straight in the DB (registering would hit its rate limit); returns the auth header + id. */
const person = async (email: string, role: 'user' | 'contributor' | 'editor' | 'admin' = 'user') => {
  const user = await User.create({ email, name: email.split('@')[0], role, passwordHash: await hashPassword('secret123') });
  return { auth: `Bearer ${signToken(String(user._id))}`, id: String(user._id) };
};

describe('roles', () => {
  it('contributors add questions and edit only their own', async () => {
    const ann = await person('ann@example.com', 'contributor');
    const bob = await person('bob@example.com', 'contributor');
    const me = await request(app).get('/auth/me').set('Authorization', ann.auth);
    expect(me.body.user.role).toBe('contributor');

    const made = await request(app).post('/admin/questions').set('Authorization', ann.auth).send({ lessonKey: 't.a', ...one });
    expect(made.status).toBe(201);
    const id = made.body.id;
    expect((await request(app).patch(`/admin/questions/${id}`).set('Authorization', ann.auth).send({ prompt: L('Mine') })).status).toBe(200);
    expect((await request(app).patch(`/admin/questions/${id}`).set('Authorization', bob.auth).send({ prompt: L('Nope') })).status).toBe(403);

    const seedQ = await Question.findOne({ key: 't.a.q0' }).lean();
    expect((await request(app).patch(`/admin/questions/${seedQ!._id}`).set('Authorization', ann.auth).send({ prompt: L('x') })).status).toBe(403);
    expect((await request(app).delete(`/admin/questions/${seedQ!._id}`).set('Authorization', ann.auth)).status).toBe(403);

    // Categories are for editors.
    expect((await request(app).post('/admin/topics').set('Authorization', ann.auth).send({ slug: 'music', title: L('Music') })).status).toBe(403);

    const mine = await request(app).get('/admin/questions').query({ mine: true }).set('Authorization', ann.auth);
    expect(mine.body.total).toBe(1);
    expect(mine.body.questions[0]).toMatchObject({ createdBy: ann.id, author: 'ann' });
  });

  it('a contributor cannot delete a lesson others have added to', async () => {
    const ann = await person('ann@example.com', 'contributor');
    const bob = await person('bob@example.com', 'contributor');
    await request(app).post('/admin/lessons').set('Authorization', ann.auth).send({ topicSlug: 't', name: 'mine', title: L('Mine') });
    await request(app).post('/admin/questions').set('Authorization', bob.auth).send({ lessonKey: 't.mine', ...one });
    expect((await request(app).delete('/admin/lessons/t.mine').set('Authorization', bob.auth)).status).toBe(403);
    expect((await request(app).delete('/admin/lessons/t.mine').set('Authorization', ann.auth)).status).toBe(409);
    const ed = await person('ed@example.com', 'editor');
    expect((await request(app).delete('/admin/lessons/t.mine').set('Authorization', ed.auth)).status).toBe(200);
  });

  it('editors edit anything; players are kept out', async () => {
    const ed = await person('ed@example.com', 'editor');
    const ann = await person('ann@example.com', 'contributor');
    const made = await request(app).post('/admin/questions').set('Authorization', ann.auth).send({ lessonKey: 't.a', ...one });
    expect((await request(app).patch(`/admin/questions/${made.body.id}`).set('Authorization', ed.auth).send({ answer: 1 })).status).toBe(200);
    expect((await request(app).post('/admin/topics').set('Authorization', ed.auth).send({ slug: 'music', title: L('Music') })).status).toBe(201);
    expect((await request(app).get('/admin/users').set('Authorization', ed.auth)).status).toBe(403);

    const pat = await person('pat@example.com');
    expect((await request(app).get('/admin/topics').set('Authorization', pat.auth)).status).toBe(403);
  });
});

describe('users (admin)', () => {
  it('lists people with their activity and changes roles', async () => {
    const boss = await person('boss@example.com');
    const ann = await person('ann@example.com');
    const q = await Question.findOne().lean();
    await request(app).post('/attempts').set('Authorization', ann.auth).send({ topicSlug: 't', answers: [{ questionId: String(q!._id), choice: 0 }] });

    const list = await request(app).get('/admin/users').set('Authorization', boss.auth);
    expect(list.status).toBe(200);
    expect(list.body.total).toBe(2);
    expect(list.body.roles).toMatchObject({ admin: 1, user: 1 });
    const annRow = list.body.users.find((u: any) => u.email === 'ann@example.com');
    expect(annRow).toMatchObject({ role: 'user', quizzes: 1, avgPercent: 100, signIn: ['password'] });
    expect(list.body.users.find((u: any) => u.email === 'boss@example.com').roleFromEnv).toBe(true);

    const set = await request(app).patch(`/admin/users/${ann.id}`).set('Authorization', boss.auth).send({ role: 'editor' });
    expect(set.body.user.role).toBe('editor');
    expect((await request(app).get('/admin/users').query({ role: 'editor' }).set('Authorization', boss.auth)).body.total).toBe(1);
    expect((await request(app).patch(`/admin/users/${boss.id}`).set('Authorization', boss.auth).send({ role: 'user' })).status).toBe(400);
    expect((await request(app).patch(`/admin/users/${ann.id}`).set('Authorization', boss.auth).send({ role: 'king' })).status).toBe(400);
  });
});

describe('reports', () => {
  it('players report, editors see and resolve, the answer can be fixed', async () => {
    const q = await Question.findOne({ key: 't.a.q0' }).lean();
    const pat = await person('pat@example.com');
    const body = { questionId: String(q!._id), reason: 'wrong_answer', suggested: 2, note: 'It is y' };
    expect((await request(app).post('/quiz/report').set('Authorization', pat.auth).send(body)).status).toBe(201);
    // The same person twice is one report.
    const again = await request(app).post('/quiz/report').set('Authorization', pat.auth).send(body);
    expect(again.body.duplicate).toBe(true);
    // Anonymous is allowed.
    expect((await request(app).post('/quiz/report').send({ ...body, reason: 'typo' })).status).toBe(201);
    expect((await request(app).post('/quiz/report').send({ ...body, reason: 'nonsense' })).status).toBe(400);

    // Players never see reports.
    const deck = await request(app).get('/quiz/deck').query({ topic: 't', lesson: 't.a' });
    expect(deck.body.questions[0].reports).toBeUndefined();
    expect(deck.body.questions[0].openReports).toBeUndefined();

    const ann = await person('ann@example.com', 'contributor');
    expect((await request(app).get('/admin/reports').set('Authorization', ann.auth)).status).toBe(403);

    const ed = await person('ed@example.com', 'editor');
    const open = await request(app).get('/admin/reports').set('Authorization', ed.auth);
    expect(open.body).toMatchObject({ total: 1, openTotal: 1 });
    expect(open.body.questions[0]).toMatchObject({ openReports: 2, answer: 0, lessonTitle: { en: 't.a' } });
    expect(open.body.questions[0].reports).toHaveLength(2);
    expect(open.body.questions[0].reports[0].reporter).toBeUndefined();

    const fix = await request(app).patch(`/admin/reports/${q!._id}`).set('Authorization', ed.auth).send({ status: 'fixed', answer: 2 });
    expect(fix.status).toBe(200);
    const after = await Question.findById(q!._id).select('+answer +reports').lean();
    expect(after).toMatchObject({ answer: 2, openReports: 0, origin: 'admin' });
    expect(after!.reports.every((r) => r.status === 'fixed' && r.resolvedBy === 'ed')).toBe(true);

    expect((await request(app).get('/admin/reports').set('Authorization', ed.auth)).body.total).toBe(0);
    expect((await request(app).get('/admin/reports').query({ status: 'closed' }).set('Authorization', ed.auth)).body.total).toBe(1);
    // Once closed, the same player may report again.
    expect((await request(app).post('/quiz/report').set('Authorization', pat.auth).send(body)).body.duplicate).toBe(false);
  });
});

describe('jeopardy', () => {
  it('deals a board of lessons with 5 rising clues and no answers', async () => {
    const res = await request(app).get('/jeopardy/board').query({ topics: 't', columns: 6 });
    expect(res.status).toBe(200);
    expect(res.body.columns).toHaveLength(3); // only 3 lessons exist
    for (const col of res.body.columns) {
      expect(col.clues.map((c: any) => c.value)).toEqual([200, 400, 600, 800, 1000]);
      expect(col.topic.slug).toBe('t');
      for (const c of col.clues) expect(c.question.answer).toBeUndefined();
      const diffs = col.clues.map((c: any) => c.question.difficulty);
      expect([...diffs].sort()).toEqual(diffs);
    }
    expect(res.body.dailyDouble.row).toBeGreaterThan(0);
    expect((await request(app).get('/jeopardy/board').query({ topics: 'nope' })).status).toBe(404);
  });

  it('checks without revealing on a miss', async () => {
    const q = await Question.findOne({ key: 't.a.q0' }).lean();
    const id = String(q!._id);
    const miss = await request(app).post('/jeopardy/check').send({ questionId: id, choice: 1, first: true });
    expect(miss.body).toEqual({ correct: false });
    const hit = await request(app).post('/jeopardy/check').send({ questionId: id, choice: 0 });
    expect(hit.body).toMatchObject({ correct: true, answer: 0 });
    const shown = await request(app).post('/jeopardy/check').send({ questionId: id });
    expect(shown.body).toMatchObject({ correct: false, answer: 0, explanation: { en: 'because' } });
    // Only the first try is counted.
    expect((await Question.findById(id).lean())!.stats).toMatchObject({ attempts: 1, correct: 0 });
  });

  it('ranks by real miss rate once a question has answers', () => {
    expect(hardness({ difficulty: 1, stats: { attempts: 10, correct: 0 } })).toBeGreaterThan(hardness({ difficulty: 3 }) * 0.5);
    const pool = [1, 3, 2, 1, 3, 2, 2].map((d, i) => ({ difficulty: d, i }));
    const picked = ladder(pool);
    expect(picked).toHaveLength(5);
    expect(picked[0].difficulty).toBe(1);
    expect(picked[4].difficulty).toBe(3);
  });
});
