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

/** Filter for questions that can be served to players. */
export const servable = { hidden: { $ne: true } };

export type QuestionDoc = InferSchemaType<typeof questionSchema>;
export const Question = model('Question', questionSchema);
