import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { seedBundles } from './seed/seed';
import { bundles } from './seed/data';
import { Question } from './modules/question/question.model';
import type { SeedBundle } from './seed/types';
import { clearTestDb, startTestDb, stopTestDb } from './test/setup';

const L = (en: string) => ({ en, mn: en });

const mini: SeedBundle = {
  topic: { slug: 't', order: 1, color: '#000', icon: '', title: L('T'), tagline: L('t'), description: L('d') },
  lessons: [
    {
      topicSlug: 't',
      key: 't.a',
      order: 1,
      title: L('A'),
      summary: L('s'),
      body: L('b'),
      visual: { kind: 'bar', unit: L('km'), items: [{ label: L('x'), value: 1 }] },
      funFacts: [],
    },
  ],
  questions: [0, 1, 2].map((i) => ({
    topicSlug: 't',
    lessonKey: 't.a',
    key: `t.a.q${i}`,
    difficulty: 1 as const,
    prompt: L(`Q${i}`),
    choices: [L('a'), L('b'), L('c'), L('d')],
    answer: i,
    explanation: L('because'),
  })),
};

const app = createApp();

beforeAll(startTestDb);
afterAll(stopTestDb);
beforeEach(async () => {
  await clearTestDb();
  await seedBundles([mini]);
});

describe('seed content', () => {
  it('real seed files are valid and load', async () => {
    const report = await seedBundles(bundles);
    expect(report.slice(0, bundles.length).map((r) => r.split(":")[0])).toEqual(bundles.map((b) => b.topic.slug));
    const res = await request(app).get('/topics');
    expect(res.body.map((t: any) => t.slug)).toEqual(expect.arrayContaining(['gods', 'geography']));
  });

  it('re-seeding keeps answer stats and removes deleted questions', async () => {
    await Question.updateOne({ key: 't.a.q0' }, { $set: { 'stats.attempts': 5 } });
    await seedBundles([{ ...mini, questions: mini.questions.slice(0, 2) }]);
    expect((await Question.findOne({ key: 't.a.q0' }).lean())!.stats!.attempts).toBe(5);
    expect(await Question.countDocuments({ topicSlug: 't' })).toBe(2);
  });
});

describe('quiz flow', () => {
  it('never leaks the answer with the questions', async () => {
    const res = await request(app).get('/quiz').query({ topic: 't', count: 5 });
    expect(res.status).toBe(200);
    expect(res.body.questions).toHaveLength(3);
    for (const q of res.body.questions) {
      expect(q.answer).toBeUndefined();
      expect(q.explanation).toBeUndefined();
    }
  });

  it('checks an answer and counts it', async () => {
    const q = await Question.findOne({ key: 't.a.q2' });
    const wrong = await request(app).post('/quiz/answer').send({ questionId: String(q!._id), choice: 0 });
    expect(wrong.body).toMatchObject({ correct: false, answer: 2, correctRate: 0 });
    const right = await request(app).post('/quiz/answer').send({ questionId: String(q!._id), choice: 2 });
    expect(right.body).toMatchObject({ correct: true, answer: 2, correctRate: 50 });
    expect(right.body.explanation.en).toBe('because');
  });

  it('rejects bad input with 400', async () => {
    const res = await request(app).post('/quiz/answer').send({ questionId: 'nope', choice: 0 });
    expect(res.status).toBe(400);
  });

  it('scores an attempt on the server, not from the client', async () => {
    const qs = await Question.find({ topicSlug: 't' }).select('+answer').lean();
    const answers = qs.map((q, i) => ({ questionId: String(q._id), choice: i === 0 ? q.answer : (q.answer + 1) % 4 }));

    const first = await request(app).post('/attempts').send({ topicSlug: 't', answers });
    expect(first.status).toBe(201);
    expect(first.body).toMatchObject({ score: 1, total: 3, percent: 33, betterThan: null, plays: 1 });

    const perfect = qs.map((q) => ({ questionId: String(q._id), choice: q.answer }));
    const second = await request(app).post('/attempts').send({ topicSlug: 't', answers: perfect });
    expect(second.body).toMatchObject({ score: 3, percent: 100, betterThan: 100, plays: 2 });

    const stats = await request(app).get('/topics/t/stats');
    expect(stats.body.plays).toBe(2);
    expect(stats.body.distribution[3]).toBe(1);
    expect(stats.body.distribution[9]).toBe(1);
  });

  it('refuses answers to questions from another topic', async () => {
    const res = await request(app)
      .post('/attempts')
      .send({ topicSlug: 'other', answers: [{ questionId: String((await Question.findOne())!._id), choice: 0 }] });
    expect(res.status).toBe(400);
  });
});

describe('swipe deck + family tree', () => {
  it('a lesson deck has every lesson question, neighbours and no answers', async () => {
    await seedBundles(bundles);
    const res = await request(app).get('/quiz/deck').query({ topic: 'gods', lesson: 'gods.olympians' });
    expect(res.status).toBe(200);
    const total = await Question.countDocuments({ lessonKey: 'gods.olympians' });
    expect(res.body.questions).toHaveLength(Math.min(total, 30)); // a lesson deck holds at most 30
    expect(res.body.prev.key).toBe('gods.family-tree');
    expect(res.body.next).toBeTruthy();
    expect(res.body.lesson).toMatchObject({ key: 'gods.olympians' });
    for (const q of res.body.questions) expect(q.answer).toBeUndefined();
    // Olympian questions name gods, so the family graph rides along.
    expect(res.body.family.kind).toBe('family');
  });

  it('tags questions with the gods they are about, right answer first', async () => {
    await seedBundles(bundles);
    const q = await Question.findOne({ prompt: { $exists: true }, 'prompt.en': 'Who was the mortal mother of Dionysus?' }).lean();
    expect(q!.gods[0]).toBe('semele');
    expect(q!.gods).toContain('dionysus');
  });

  it('geography decks carry no family graph and the first lesson has no prev', async () => {
    await seedBundles(bundles);
    const res = await request(app).get('/quiz/deck').query({ topic: 'geography', lesson: 'geography.continents-area' });
    expect(res.body.family).toBeNull();
    expect(res.body.prev).toBeNull();
  });

  it('rejects family data that points at unknown people', async () => {
    const broken = structuredClone(mini);
    broken.lessons[0].visual = { kind: 'family', people: [], unions: [{ partners: ['x'], children: [] }] };
    await expect(seedBundles([broken])).rejects.toThrow(/unknown person "x"/);
  });

  it('404s an unknown lesson', async () => {
    const res = await request(app).get('/quiz/deck').query({ topic: 't', lesson: 't.nope' });
    expect(res.status).toBe(404);
  });
});

describe('tournament questions', () => {
  const show = (key: string, answer: number) => ({ ...mini.questions[0], key, answer, source: 'show' as const });
  beforeEach(() =>
    seedBundles([
      {
        ...mini,
        questions: [
          ...mini.questions,
          show('show.20240101.2', 1),
          show('show.20240101.1', 0),
          show('show.20250301.1', 2),
          { ...mini.questions[0], key: 't.a.p1', source: 'predicted' as const },
        ],
      },
    ])
  );

  it('lists the mix, predicted and each game newest first', async () => {
    const res = await request(app).get('/tournament');
    expect(res.status).toBe(200);
    expect(res.body.lessons.map((d: any) => [d.key, d.count])).toEqual([
      ['mix', 3],
      ['predicted', 1],
      ['20250301', 1],
      ['20240101', 2],
    ]);
  });

  it('a game deck keeps its question order, hides answers, and can be scored', async () => {
    const deck = await request(app).get('/quiz/deck').query({ topic: 'tournament', lesson: '20240101' });
    expect(deck.status).toBe(200);
    expect(deck.body.questions.map((q: any) => q.key)).toEqual(['show.20240101.1', 'show.20240101.2']);
    expect(deck.body.questions[0]).not.toHaveProperty('answer');
    expect(deck.body.prev.key).toBe('20250301');
    expect(deck.body.next).toBeNull();
    const answers = deck.body.questions.map((q: any) => ({ questionId: q.id, choice: 0 }));
    const res = await request(app).post('/attempts').send({ topicSlug: 'tournament', lessonKey: '20240101', answers });
    expect(res.status).toBe(201);
    expect(res.body.score).toBe(1);
  });

  it('refuses ordinary lesson questions in a tournament attempt', async () => {
    const plain = await Question.findOne({ key: 't.a.q0' }).lean();
    const answers = [{ questionId: String(plain!._id), choice: 0 }];
    const res = await request(app).post('/attempts').send({ topicSlug: 'tournament', answers });
    expect(res.status).toBe(400);
  });
});
