// Seed content format. Content lives in code (src/seed/data/*) and is upserted
// into MongoDB by `npm run seed` — keys are stable so re-seeding never
// duplicates and never wipes answer statistics.

/** Bilingual text. Every user-facing string carries both languages. */
export type L = { en: string; mn: string };

export interface SeedTopic {
  slug: string; // "gods" | "geography"
  order: number;
  color: string; // hex, used for the topic accent
  icon: string; // iconify name, e.g. "solar:crown-bold-duotone"
  title: L;
  tagline: L; // one short line under the title
  description: L; // 1–2 sentences
  /** Optional page backdrop: "stars" = animated starfield (space, astrology). */
  effect?: 'stars';
}

export type BarItem = { label: L; value: number; note?: L };

export type Visual =
  /** Ranked bar chart (rivers, mountains, continent areas…). */
  | { kind: 'bar'; unit: L; horizontal?: boolean; items: BarItem[] }
  /** Share of a whole (ocean area share, land vs water…). */
  | { kind: 'donut'; unit: L; items: BarItem[] }
  /** Family tree / hierarchy. `group` colours nodes (e.g. "primordial" | "titan" | "olympian"). */
  | {
      kind: 'tree';
      nodes: { id: string; label: L; sub?: L; group?: string }[];
      edges: { from: string; to: string; label?: L }[];
    }
  /**
   * Genealogy drawn as couples → children (a union with one partner = born of
   * one parent). The web app lets readers tap a person to see their family.
   */
  | { kind: 'family'; people: FamilyPerson[]; unions: FamilyUnion[] }
  /** Two-column matching (Greek ↔ Roman, country ↔ capital). */
  | { kind: 'pairs'; left: L; right: L; items: { left: L; right: L; note?: L; icon?: string }[] }
  /** Profile cards (each god, each continent…). `icon` is an iconify name or a single emoji. */
  | {
      kind: 'cards';
      items: {
        title: L;
        subtitle?: L;
        facts: L[];
        icon?: string;
        color?: string;
        /** picture URL shown instead of the icon (a flag…) */
        image?: string;
        /** English Wikipedia article the item is about ("" = none) — source of `photo` */
        wiki?: string;
        /** free-licence picture of the thing itself (npm run images) */
        photo?: Photo;
      }[];
    }
  /** Ordered events / stories. */
  | { kind: 'timeline'; items: { when: L; title: L; body: L }[] }
  /**
   * Animated solar system: bodies circle the star on log-scaled orbits at
   * relative speeds; tapping one opens its fact panel.
   */
  | { kind: 'orbit'; star: OrbitStar; bodies: OrbitBody[] }
  /**
   * Zodiac-style wheel of 12 (or any number of) signs, coloured by group
   * (element); tapping a sign opens its profile.
   */
  | { kind: 'zodiac'; groups: ZodiacGroup[]; signs: ZodiacSign[] }
  /**
   * Vector map (maps/<map>.json): each item colours one region — by `value`
   * when given (choropleth), else highlighted — and tapping it opens its facts.
   */
  | ({ kind: 'map' } & MapPayload);

export type MapName = 'mongolia' | 'world';

export type MapItem = { id: string; title: L; value?: number; subtitle?: L; facts?: L[] };

export type MapPayload = { map: MapName; unit?: L; items: MapItem[] };

/**
 * Places a question is about. `context` (from the prompt) may show before
 * answering; `answer` (from the right answer / explanation) is only revealed
 * with the result. `locate` = "which region is highlighted?" questions.
 */
export type QuestionMap = { name: MapName; context: string[]; answer: string[]; locate?: boolean };

/** A Wikimedia Commons picture: `src` for the card, `full` for zooming, `file` credits it. */
export type Photo = { src: string; full: string; width: number; height: number; file: string };

export type Stat = { label: L; value: L };

export type OrbitStar = { name: L; color: string; facts: L[]; stats?: Stat[] };

export type OrbitBody = {
  id: string; // "earth"
  name: L;
  kind: L; // "Rocky planet", "Gas giant", "Dwarf planet"…
  color: string; // main hex colour of the disc
  color2?: string; // second hex for the gradient / bands
  size: number; // relative drawn size 1–10 (not to scale)
  distanceAu: number; // mean distance from the star, AU
  periodDays: number; // orbital period in Earth days
  ring?: boolean; // draw a ring (Saturn, Uranus…)
  moons?: number;
  stats: Stat[]; // 3–6 headline numbers
  facts: L[]; // 3–5 rich facts
};

export type ZodiacGroup = { id: string; name: L; color: string; note?: L };

export type ZodiacSign = {
  id: string; // "aries"
  name: L;
  symbol: string; // glyph or emoji: "♈" / "🐭"
  group: string; // ZodiacGroup id (element)
  dates?: L; // "Mar 21 – Apr 19" or "2020, 2032…"
  tags?: L[]; // short labels: modality, ruling planet, polarity…
  description: L; // 2–3 sentences
  traits: L[]; // 3–5 traditional traits
};

export type FamilyPerson = {
  id: string; // also used to tag questions, e.g. "zeus"
  name: L;
  roman?: L; // Roman name, when different or notable
  role: L; // what they rule / who they are, a few words
  group: 'primordial' | 'titan' | 'olympian' | 'god' | 'mortal';
  emoji?: string;
  spouses?: string[]; // married to (shown in the detail panel; children come from unions)
  note?: L; // one line, e.g. a disputed parentage
};

export type FamilyUnion = { partners: string[]; children: string[]; note?: L };

export interface SeedLesson {
  topicSlug: string;
  key: string; // stable unique id, e.g. "gods.olympians"
  order: number;
  title: L;
  summary: L; // one sentence shown on the lesson card
  body: L; // short intro paragraph (2–4 sentences), plain text
  visual: Visual;
  /** "Did you know?" one-liners shown under the visual. */
  funFacts: L[];
  /** Map of the places the visual lists (derived by the seed for geography lessons). */
  map?: MapPayload | null;
}

export interface SeedQuestion {
  topicSlug: string;
  lessonKey: string; // the lesson this question tests
  key: string; // stable unique id, e.g. "gods.olympians.q1"
  difficulty: 1 | 2 | 3;
  prompt: L;
  choices: L[]; // exactly 4
  answer: number; // index into choices (0–3)
  explanation: L; // shown after answering — teaches the fact, 1–2 sentences
  /**
   * Family-tree people this question is about (FamilyPerson ids). Optional:
   * the seed derives them from the text when omitted.
   */
  gods?: string[];
  /**
   * Where the question comes from: "show" = asked at a real Quiz League game,
   * "predicted" = written in the style of those games to prepare for the next
   * one. Omitted for regular lesson questions.
   */
  source?: 'show' | 'predicted';
  /** Derived by the seed for geography questions (see seed/places.ts). */
  map?: QuestionMap | null;
}

export interface SeedBundle {
  topic: SeedTopic;
  lessons: SeedLesson[];
  questions: SeedQuestion[];
}

/** Gemini output kept for review in src/seed/data/generated/<topic>.json. */
export interface GeneratedFile {
  lessons: SeedLesson[];
  questions: SeedQuestion[];
}

/** A lesson's completed visual from `npm run expand` (src/seed/data/expansions.json). */
export interface Expansion {
  visual: Visual;
  funFacts: L[];
  /** Size of the complete set the lesson names (9 districts → 9); expand never grows it past that. */
  closedSet?: number;
}

/**
 * Lesson → category arrangement proposed by Gemini (`npm run categorize`),
 * kept in src/seed/data/categories.json and applied at seed time.
 */
export interface Categories {
  rationale?: string;
  topics: { topic: SeedTopic; lessons: string[]; missing?: string[] }[];
}
