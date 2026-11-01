# quiz-backend

API for **Trivia-wiki** — short visual lessons (mythology, geography, space,
astrology, general trivia) and quizzes, with accounts and a personal analysis. Same stack as `chatbot`: Express 5 + Mongoose 8 + TypeScript + zod,
vitest + mongodb-memory-server for tests. Database: MongoDB Atlas.

The web app lives in `../quiz`.

## Run

```bash
cp .env.example .env        # put your Atlas URI in MONGODB_URI (db name: quiz)
npm install
npm run seed                # upsert topics/lessons/questions into Atlas
npm run dev                 # http://localhost:4010
```

No Atlas yet? `npm run dev:memory` starts an in-memory MongoDB, seeds it and
serves the API (data is gone on exit).

Production: `npm run build && npm start`, then `npm run seed:prod` once per deploy
that changes content.

## Content

All content is code in `src/seed/data/` (`gods.ts`, `geography.ts`, `pubquiz.ts`), typed by
`src/seed/types.ts`. Every string is bilingual `{ en, mn }`.

- **Lesson** = intro text + one `visual` (`bar` | `donut` | `tree` | `pairs` |
  `cards` | `timeline`) + "did you know" facts.
- **Question** = 4 choices, `answer` index, explanation, linked to a lesson by
  `lessonKey`.
- **Family** (`visual.kind: 'family'`, gods: `src/seed/data/gods-family.ts`) =
  people + unions (partners → children). The seed tags every question with the
  people it names (`gods`, right answer first) so the quiz can show that branch;
  set `gods: [...]` on a question to override.

`npm run seed` upserts by stable `key` and removes lessons/questions whose key
is gone. It validates first (4 choices, answer in range, unique keys, known
lessonKey). Answer statistics on existing questions survive re-seeding, so don't
rename a key unless you mean to reset its stats.

### Generating more with Gemini

`npm run generate` drafts bilingual lessons/questions with Gemini (Vertex AI via
`gcloud auth application-default login`, same Google Cloud project as sedev, or
`GEMINI_API_KEY`), fact-checks them in a second Google-Search-grounded call, drops
anything it can't confirm, and writes `src/seed/data/generated/<topic>.json`. The
seed merges that file with the hand-written bundle. Review the diff, then `npm run seed`.

```bash
npm run generate -- --topic gods --count 10                       # +10 per lesson
npm run generate -- --topic geography --new-lessons 3 --lesson new --count 8
npm run generate -- --topic pubquiz --lesson pubquiz.cinema --count 20 \
  --source predicted --brief QUIZ-LEAGUE-ANALYSIS.md
```

`pubquiz` (General trivia) questions carry `source`: `show` = asked at a real
game, `predicted` = written in the quiz masters' style from
`QUIZ-LEAGUE-ANALYSIS.md`. The web app shows a badge for both.

To add a topic: write `src/seed/data/<topic>.ts` exporting a `SeedBundle`, add it
to `src/seed/data/index.ts`, run `npm run seed`. The web app picks it up.

## API

| Method | Path | |
| --- | --- | --- |
| GET | `/topics` | topics + lesson/question/play counts |
| GET | `/topics/:slug` | topic + lessons (with visuals) |
| GET | `/topics/:slug/stats` | plays, average, score histogram, hardest questions |
| GET | `/quiz/deck?topic=&lesson=&count=` | one swipe story: questions (random order, **no answers**), prev/next lesson, family graph |
| GET | `/quiz?topic=&lesson=&count=` | random questions — **no answers** |
| POST | `/quiz/answer` `{questionId, choice}` | correct?, right answer, explanation, % who got it right |
| POST | `/attempts` `{topicSlug, lessonKey?, answers[], durationMs}` | server-side score, "better than X%" |

No accounts: play is anonymous. Answers are only revealed one at a time by
`/quiz/answer`, and the final score is recomputed on the server. Both POSTs are
rate-limited per IP (in-memory, single process).

## Test

```bash
npm test          # also validates the real seed files
npm run typecheck
```

### More content as JSON

`src/seed/data/extra/*.json` (same shape as a generated file) adds lessons and
questions to any topic — rows are routed by `topicSlug`. Question keys use a
per-file tag (`<lessonKey>.a1`, `.b2`…) so files never collide.

## Accounts & analysis

- `POST /auth/register | /auth/login` (email + password, scrypt), `POST /auth/google`
  (`{ credential }` = Google Identity Services ID token, checked against
  `GOOGLE_CLIENT_ID`), `GET /auth/me`. Tokens are HS256 JWTs signed with `JWT_SECRET`.
- A signed-in `POST /attempts` also stores each answer (`items`: lesson, difficulty,
  correct). `GET /me/analysis` rolls them up: totals, streak, accuracy per category /
  lesson / difficulty, trend, **lessons to improve** (recent accuracy < 60%, ≥ 3
  answers), strengths, untried lessons and the questions missed last time.

## Admin

`ADMIN_EMAILS` (or `role: 'admin'`) opens `/admin/*`: create/edit/delete categories
(topics), lessons (cards visual) and questions, plus bulk JSON import. Admin rows
carry `origin: 'admin'`; the seed never overwrites or deletes them. Editing a seed
question makes it admin-owned; deleting one sets `hidden: true` so re-seeding
doesn't bring it back.
