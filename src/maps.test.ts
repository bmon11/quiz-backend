import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './app';
import { seedBundles } from './seed/seed';
import { findPlaces, lessonMap, tagMap } from './seed/places';
import { bundles } from './seed/data';
import { AIMAG_MAP, WORLD_MAP } from './seed/data/maps';
import type { SeedBundle, SeedQuestion } from './seed/types';
import { clearTestDb, startTestDb, stopTestDb } from './test/setup';

const L = (en: string) => ({ en, mn: en });
const q = (key: string, prompt: string, choices: string[], answer = 0): SeedQuestion => ({
  topicSlug: 'countries',
  lessonKey: 'countries.a',
  key,
  difficulty: 1,
  prompt: L(prompt),
  choices: choices.map(L),
  answer,
  explanation: L('because'),
});

describe('place matching', () => {
  it('finds aimags and countries, longest name first, accents folded', () => {
    expect(findPlaces('Khovsgol and Bayan-Olgii', 'mongolia')).toEqual(['khovsgol', 'bayan-olgii']);
    expect(findPlaces('Papua New Guinea, not Guinea-Bissau', 'world')).toEqual(['PNG', 'GNB']);
    expect(findPlaces('the Selenge River and Sükhbaatar Square', 'mongolia')).toEqual([]);
    expect(findPlaces('a statue of D. Sükhbaatar', 'mongolia')).toEqual([]);
    expect(findPlaces('Inner Mongolia', 'world')).toEqual(['CHN']);
  });

  it('keeps answer places for after answering and never hints a choice', () => {
    expect(tagMap(q('a', 'What is the capital of Canada?', ['Ottawa', 'Toronto', 'Montreal', 'Vancouver']))).toEqual({
      name: 'world',
      context: ['CAN'],
      answer: [],
    });
    // The prompt names a choice → nothing shown before answering.
    expect(tagMap(q('b', 'Which is bigger, France or Spain?', ['France', 'Spain', 'Equal', 'Unknown']))).toMatchObject({
      context: [],
      answer: ['FRA', 'ESP'],
    });
    // Aimags win over countries.
    expect(tagMap(q('c', 'In which Mongolian aimag is Lake Khövsgöl?', ['Khövsgöl', 'Uvs', 'Khovd', 'Zavkhan']))!.name).toBe('mongolia');
    // Only "Ulaanbaatar" in the prompt says nothing.
    expect(tagMap(q('d', 'How many districts does Ulaanbaatar have?', ['9', '6', '12', '21']))).toBeNull();
    expect(tagMap(q('e', 'Who painted the Mona Lisa?', ['Leonardo', 'Raphael', 'Titian', 'Bosch']))).toBeNull();
  });

  it('builds the aimag and world map lessons from the real content', () => {
    const all = bundles.flatMap((b) => b.lessons);
    const aimags = all.find((l) => l.key === AIMAG_MAP)!;
    expect(aimags.topicSlug).toBe('mongolia');
    expect(aimags.visual.kind).toBe('map');
    expect((aimags.visual as any).items).toHaveLength(22);
    expect((aimags.visual as any).items.filter((i: any) => i.value).length).toBeGreaterThanOrEqual(21);
    const world = all.find((l) => l.key === WORLD_MAP)!;
    expect((world.visual as any).items.length).toBeGreaterThan(60);

    const where = bundles.flatMap((b) => b.questions).filter((x) => x.lessonKey === AIMAG_MAP);
    expect(where).toHaveLength(21);
    for (const w of where) {
      expect(w.map!.locate).toBe(true);
      expect(new Set(w.choices.map((c) => c.en)).size).toBe(4);
      expect(findPlaces(w.choices[w.answer].en, 'mongolia')).toEqual(w.map!.context);
    }
    // Lessons that list places get a map; the capitals table is on the world map.
    const capitals = all.find((l) => l.key === 'geography.capitals')!;
    expect(lessonMap(capitals)?.map).toBe('world');
  });
});

describe('maps in the API', () => {
  const app = createApp();
  const mini: SeedBundle = {
    topic: { slug: 'countries', order: 1, color: '#000', icon: '', title: L('C'), tagline: L('t'), description: L('d') },
    lessons: [
      {
        topicSlug: 'countries',
        key: 'countries.a',
        order: 1,
        title: L('A'),
        summary: L('s'),
        body: L('b'),
        visual: { kind: 'pairs', left: L('Country'), right: L('Capital'), items: ['Japan', 'France', 'Chile'].map((c) => ({ left: L(c), right: L('x') })) },
        funFacts: [],
      },
    ],
    questions: [q('countries.a.q1', 'Which country has Tokyo as its capital?', ['Japan', 'China', 'Korea', 'Laos'])],
  };

  beforeAll(startTestDb);
  afterAll(stopTestDb);
  beforeEach(async () => {
    await clearTestDb();
    await seedBundles([mini]);
  });

  it('hides answer places until the answer, and serves the map files', async () => {
    const deck = await request(app).get('/quiz/deck').query({ topic: 'countries', lesson: 'countries.a' });
    expect(deck.body.questions[0].map).toEqual({ name: 'world', context: [], locate: false });
    const reply = await request(app).post('/quiz/answer').send({ questionId: deck.body.questions[0].id, choice: 1 });
    expect(reply.body.map).toMatchObject({ name: 'world', answer: ['JPN'] });

    const topic = await request(app).get('/topics/countries');
    expect(topic.body.lessons[0].map).toMatchObject({ map: 'world', items: [{ id: 'JPN' }, { id: 'FRA' }, { id: 'CHL' }] });

    const file = await request(app).get('/maps/mongolia.json');
    expect(file.status).toBe(200);
    expect(file.body.objects.regions.geometries).toHaveLength(22);
  });
});
