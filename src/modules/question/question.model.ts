import { Schema, model, InferSchemaType } from 'mongoose';
import { LSchema } from '../shared/l10n';

const questionSchema = new Schema(
  {
    topicSlug: { type: String, required: true },
    lessonKey: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    difficulty: { type: Number, enum: [1, 2, 3], default: 1 },
    prompt: { type: LSchema, required: true },
    choices: { type: [LSchema], required: true },
    // Never sent with the question — only revealed by POST /quiz/answer.
    answer: { type: Number, required: true, select: false },
    explanation: { type: LSchema, required: true },
    // Family-tree people (ids in the topic's family visual) this question is
    // about — the quiz shows their branch of the tree after answering.
    gods: { type: [String], default: [] },
    // "show" = asked at a real Quiz League game, "predicted" = written in that style.
    source: { type: String, enum: ['show', 'predicted'] },
    // "seed" = authored in src/seed/data, "admin" = added or edited in the admin
    // page. The seed never overwrites or removes admin-owned questions.
    origin: { type: String, enum: ['seed', 'admin'], default: 'seed' },
    // Who added it in the admin page — a contributor may edit only their own.
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    // Players flag a wrong answer / typo here; editors resolve them in the
    // admin page. Kept on the question (no extra collection). `reporter` is the
    // user id or a hash of the IP, so one person can't pile on the same question.
    reports: {
      type: [
        {
          reporter: { type: String, required: true },
          userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
          name: { type: String, default: '' },
          reason: { type: String, enum: ['wrong_answer', 'typo', 'unclear', 'outdated', 'other'], required: true },
          suggested: { type: Number, default: null }, // the choice they think is right
          note: { type: String, default: '' },
          lang: { type: String, default: '' },
          status: { type: String, enum: ['open', 'fixed', 'dismissed'], default: 'open' },
          resolvedBy: { type: String, default: '' },
          resolvedAt: { type: Date },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
      select: false,
    },
    openReports: { type: Number, default: 0 },
    // A seed question the admin deleted: kept (so re-seeding doesn't bring it back) but never served.
    hidden: { type: Boolean, default: false },
    // Live counters, bumped atomically on every answer. The seed script never
    // touches these, so re-seeding keeps the "x% got this right" history.
    stats: {
      attempts: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

questionSchema.index({ topicSlug: 1, lessonKey: 1 });
questionSchema.index({ openReports: -1, updatedAt: -1 }, { partialFilterExpression: { openReports: { $gt: 0 } } });

/** Filter for questions that can be served to players. */
export const servable = { hidden: { $ne: true } };

/** What players never see of a question (aggregation $project). */
export const playerProjection = {
  answer: 0, explanation: 0, createdAt: 0, updatedAt: 0, __v: 0, origin: 0, hidden: 0,
  createdBy: 0, reports: 0, openReports: 0,
} as const;

export type QuestionDoc = InferSchemaType<typeof questionSchema>;
export const Question = model('Question', questionSchema);
