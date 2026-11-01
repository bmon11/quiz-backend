import type { GeneratedFile, L, MapItem, SeedLesson, SeedQuestion } from '../types';
import { placeNamed, readPlaces, type Place } from '../places';

// Map lessons built from the place list + the lessons that already describe
// those places: "Aimags on the map" (facts from the aimag cards, areas from the
// area chart) and "Countries on the map" (the largest-countries chart). Each
// region gets a "which one is highlighted?" question. Rebuilt on every seed.

export const AIMAG_MAP = 'mongolia.aimag-map';
export const WORLD_MAP = 'geography.world-map';

/** Same text → same numbers, so choices don't reshuffle on every seed. */
const rng = (seed: string) => {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};

const pick = <T>(list: T[], n: number, random: () => number) => {
  const pool = [...list];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(random() * pool.length), 1)[0]);
  return out;
};

const name = (p: Place): L => ({ en: p.en, mn: p.mn });

const locate = (
  lessonKey: string,
  map: 'mongolia' | 'world',
  place: Place,
  others: Place[],
  difficulty: 1 | 2 | 3,
  prompt: L,
  explanation: L
): SeedQuestion => {
  const random = rng(`${lessonKey}.${place.id}`);
  const wrong = pick(others, 3, random);
  const answer = Math.floor(random() * 4);
  const choices = [...wrong];
  choices.splice(answer, 0, place);
  return {
    topicSlug: lessonKey.split('.')[0],
    lessonKey,
    key: `${lessonKey}.where-${place.id}`,
    difficulty,
    prompt,
    choices: choices.map(name),
    answer,
    explanation,
    map: { name: map, context: [place.id], answer: [place.id], locate: true },
  };
};

const rowsByPlace = <T>(lesson: SeedLesson | undefined, map: 'mongolia' | 'world', label: (item: any) => string) => {
  const out = new Map<string, T>();
  const items = (lesson?.visual as { items?: T[] } | undefined)?.items ?? [];
  for (const item of items) {
    const id = placeNamed(label(item), map);
    if (id && !out.has(id)) out.set(id, item);
  }
  return out;
};

const aimagLesson = (lessons: SeedLesson[]): GeneratedFile => {
  const aimags = readPlaces().mongolia;
  if (!aimags.length) return { lessons: [], questions: [] };
  const cards = rowsByPlace<{ title: L; facts: L[]; subtitle?: L }>(
    lessons.find((l) => l.key === 'mongolia.aimag-flags'),
    'mongolia',
    (i) => i.title.en
  );
  const areas = rowsByPlace<{ label: L; value: number }>(
    lessons.find((l) => l.key === 'mongolia.aimag-areas'),
    'mongolia',
    (i) => i.label.en
  );
  const items: MapItem[] = aimags.map((p) => {
    const card = cards.get(p.id);
    const area = areas.get(p.id)?.value;
    return {
      id: p.id,
      title: name(p),
      ...(area !== undefined && { value: area }),
      ...(p.id === 'ulaanbaatar' && { subtitle: { en: 'The capital — not part of any aimag', mn: 'Нийслэл — аль ч аймагт харьяалагдахгүй' } }),
      ...(card?.facts?.length && { facts: card.facts.slice(0, 4) }),
    };
  });

  const lesson: SeedLesson = {
    topicSlug: 'mongolia',
    key: AIMAG_MAP,
    order: 0,
    title: { en: 'Aimags on the map', mn: 'Аймгууд газрын зураг дээр' },
    summary: {
      en: 'All 21 aimags and the capital on one map — tap any to learn about it.',
      mn: '21 аймаг, нийслэл нэг газрын зураг дээр — дээр нь дарж танилцаарай.',
    },
    body: {
      en: 'Mongolia is divided into 21 aimags (provinces) plus the capital, Ulaanbaatar, which stands on its own. The vast Gobi aimags fill the south, the mountains of the Altai the far west, and the steppe the east. Darker colour = larger area.',
      mn: 'Монгол Улс 21 аймаг, бие даасан нийслэл Улаанбаатараас бүрдэнэ. Өмнөд хэсгийг говийн уудам аймгууд, баруун хязгаарыг Алтайн нуруу, зүүнийг тал хээр эзэлдэг. Өнгө тод байх тусам нутаг дэвсгэр том.',
    },
    visual: { kind: 'map', map: 'mongolia', unit: { en: 'km²', mn: 'км²' }, items },
    funFacts: [
      {
        en: 'Ömnögovi is the largest aimag — bigger than many European countries.',
        mn: 'Өмнөговь бол хамгийн том аймаг — Европын олон улсаас том.',
      },
      {
        en: 'Orkhon, Darkhan-Uul and Govisümber are tiny aimags built around one town each.',
        mn: 'Орхон, Дархан-Уул, Говьсүмбэр бол тус бүр нэг хотыг тойрсон жижиг аймгууд.',
      },
    ],
  };

  const real = aimags.filter((p) => p.id !== 'ulaanbaatar');
  const questions = real.map((p) => {
    const area = areas.get(p.id)?.value;
    const difficulty = area === undefined ? 2 : area > 100_000 ? 1 : area < 10_000 ? 3 : 2;
    const fact = cards.get(p.id)?.facts?.[0];
    return locate(
      AIMAG_MAP,
      'mongolia',
      p,
      real.filter((o) => o.id !== p.id),
      difficulty,
      { en: 'Which aimag is highlighted on the map?', mn: 'Газрын зураг дээр тодруулсан аль аймаг вэ?' },
      {
        en: `That is ${p.en}${area ? ` (${area.toLocaleString('en')} km²)` : ''}.${fact ? ` ${fact.en}` : ''}`,
        mn: `Энэ бол ${p.mn} аймаг${area ? ` (${area.toLocaleString('en')} км²)` : ''}.${fact ? ` ${fact.mn}` : ''}`,
      }
    );
  });
  return { lessons: [lesson], questions };
};

const worldLesson = (lessons: SeedLesson[]): GeneratedFile => {
  const countries = readPlaces().world;
  const source = lessons.find((l) => l.key === 'geography.countries');
  if (!countries.length || source?.visual.kind !== 'bar') return { lessons: [], questions: [] };
  const byId = new Map(countries.map((c) => [c.id, c]));
  const ranked = source.visual.items
    .map((item, rank) => ({ item, rank, place: byId.get(placeNamed(item.label.en, 'world') ?? '') }))
    .filter((r): r is typeof r & { place: Place } => !!r.place)
    .filter((r, i, all) => all.findIndex((o) => o.place.id === r.place.id) === i);
  const unit = source.visual.unit;

  const lesson: SeedLesson = {
    topicSlug: 'countries',
    key: WORLD_MAP,
    order: 0,
    title: { en: 'Countries on the map', mn: 'Улсууд газрын зураг дээр' },
    summary: {
      en: `The ${ranked.length} largest countries on a world map — tap one to see its size.`,
      mn: `Дэлхийн хамгийн том ${ranked.length} улс газрын зураг дээр — дарж хэмжээг нь хараарай.`,
    },
    body: {
      en: 'Knowing where a country sits makes every other fact about it stick. Darker colour = larger area. Zoom in with the buttons to find the smaller ones.',
      mn: 'Улс хаана байрладгийг мэдвэл бусад баримт нь амархан тогтдог. Өнгө тод байх тусам нутаг дэвсгэр том. Жижиг улсуудыг томруулж олоорой.',
    },
    visual: {
      kind: 'map',
      map: 'world',
      unit,
      items: ranked.map(({ item, place }) => ({
        id: place.id,
        title: name(place),
        value: item.value,
        ...(item.note && { facts: [item.note] }),
      })),
    },
    funFacts: [
      {
        en: 'Russia alone covers about one eighth of all the land on Earth.',
        mn: 'Орос дангаараа дэлхийн хуурай газрын наймны нэг орчмыг эзэлдэг.',
      },
    ],
  };

  const questions = ranked.map(({ item, rank, place }) => {
    const sameContinent = countries.filter((c) => c.id !== place.id && c.continent === place.continent);
    const others = sameContinent.length >= 3 ? sameContinent : countries.filter((c) => c.id !== place.id);
    return locate(
      WORLD_MAP,
      'world',
      place,
      others,
      rank < 20 ? 1 : rank < 50 ? 2 : 3,
      { en: 'Which country is highlighted on the map?', mn: 'Газрын зураг дээр тодруулсан аль улс вэ?' },
      {
        en: `That is ${place.en} — about ${item.value} ${unit.en}.`,
        mn: `Энэ бол ${place.mn} — ойролцоогоор ${item.value} ${unit.mn}.`,
      }
    );
  });
  return { lessons: [lesson], questions };
};

/** Both map lessons, from the content they draw on. */
export const mapContent = (lessons: SeedLesson[]): GeneratedFile => {
  const parts = [aimagLesson(lessons), worldLesson(lessons)];
  return { lessons: parts.flatMap((p) => p.lessons), questions: parts.flatMap((p) => p.questions) };
};
