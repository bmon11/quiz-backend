import { Router } from 'express';
import { Question, playerProjection, servable } from '../question/question.model';

// «Тэмцээний асуултууд»: the questions asked at real quiz tournaments
// (`source: 'show'`), one deck per game, plus a random mix and the predicted
// ones. It plays through the ordinary quiz reader: the slug `tournament` stands
// in for a topic and each game for a lesson (GET /quiz/deck branches here).

const router = Router();

export const TOURNAMENT = 'tournament';

export const TOURNAMENT_TOPIC = {
  slug: TOURNAMENT,
  color: '#B45309',
  icon: 'solar:cup-star-bold-duotone',
  title: { en: 'Tournament questions', mn: 'Тэмцээний асуултууд' },
  tagline: { en: 'Asked at real quiz games', mn: 'Жинхэнэ тэмцээнд асуусан асуултууд' },
};

/** Real-game questions from the photos have no date: they are one deck of their own. */
const PHOTOS = 'photos';
const MIX = 'mix';
const PREDICTED = 'predicted';
const MIX_SIZE = 20;

/** "show.20220428.12" → "20220428". */
const GAME_KEY = /^show\.(\d{8})\./;

const gameTitle = (id: string) => {
  const date = `${id.slice(0, 4)}.${id.slice(4, 6)}.${id.slice(6, 8)}`;
  return { en: `Game ${date}`, mn: `${date}-ны тоглолт` };
};

type Deck = { key: string; title: { en: string; mn: string }; count: number; year?: number };

/** Every deck, in reader order: mix, predicted, photos, then the games newest first. */
export async function tournamentDecks(): Promise<Deck[]> {
  const [games, predicted, photos, total] = await Promise.all([
    Question.aggregate<{ _id: string; n: number }>([
      { $match: { source: 'show', key: GAME_KEY, ...servable } },
      { $group: { _id: { $substrCP: ['$key', 5, 8] }, n: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]),
    Question.countDocuments({ source: PREDICTED, ...servable }),
    Question.countDocuments({ source: 'show', key: { $not: GAME_KEY }, ...servable }),
    Question.countDocuments({ source: 'show', ...servable }),
  ]);
  const decks: Deck[] = [];
  if (total) decks.push({ key: MIX, title: { en: 'Random mix', mn: 'Холимог' }, count: Math.min(MIX_SIZE, total) });
  if (predicted) decks.push({ key: PREDICTED, title: { en: 'Predicted questions', mn: 'Таамаг асуултууд' }, count: predicted });
  if (photos) decks.push({ key: PHOTOS, title: { en: 'From game photos', mn: 'Зургаас авсан' }, count: photos });
  for (const g of games) decks.push({ key: g._id, title: gameTitle(g._id), count: g.n, year: Number(g._id.slice(0, 4)) });
  return decks;
}

/** Questions of one deck: a game keeps its own order, the others are sampled. */
export async function tournamentQuestions(deck: string, count: number) {
  if (deck === MIX || deck === PREDICTED || deck === PHOTOS) {
    const match =
      deck === PREDICTED
        ? { source: PREDICTED }
        : deck === PHOTOS
          ? { source: 'show', key: { $not: GAME_KEY } }
          : { source: 'show' };
    return Question.aggregate([
      { $match: { ...match, ...servable } },
      { $sample: { size: deck === MIX ? Math.min(count, MIX_SIZE) : 30 } },
      { $project: playerProjection },
    ]);
  }
  if (!/^\d{8}$/.test(deck)) return [];
  const rows = await Question.aggregate([
    { $match: { source: 'show', key: { $regex: `^show\\.${deck}\\.` }, ...servable } },
    { $project: playerProjection },
  ]);
  const number = (key: string) => Number(key.split('.')[2]) || 0;
  return rows.sort((a, b) => number(a.key) - number(b.key)).slice(0, 30);
}

/** Questions an attempt in this mode may contain (the attempt check uses it instead of topicSlug). */
export const tournamentMatch = { source: { $in: ['show', PREDICTED] } };

// The page: the decks with their sizes, grouped by year on the client.
router.get('/', async (_req, res) => {
  res.json({ topic: TOURNAMENT_TOPIC, lessons: await tournamentDecks() });
});

export default router;
