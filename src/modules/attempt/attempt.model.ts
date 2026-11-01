import { Schema, model, InferSchemaType } from 'mongoose';

/**
 * One finished quiz run. Anonymous unless the player is signed in; then it
 * also keeps each answer's lesson and result, which /me/analysis rolls up into
 * "where to improve".
 */
const attemptSchema = new Schema(
  {
    topicSlug: { type: String, required: true },
    lessonKey: { type: String, default: null }, // null = whole-topic quiz
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    percent: { type: Number, required: true }, // 0–100, rounded
    durationMs: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    items: {
      type: [
        {
          _id: false,
          questionId: { type: Schema.Types.ObjectId, required: true },
          lessonKey: { type: String, required: true },
          difficulty: { type: Number, default: 1 },
          choice: { type: Number, required: true },
          correct: { type: Boolean, required: true },
        },
      ],
      default: undefined, // anonymous runs store no items
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

attemptSchema.index({ topicSlug: 1, percent: 1 });
attemptSchema.index({ userId: 1, createdAt: -1 }, { partialFilterExpression: { userId: { $type: 'objectId' } } });

export type AttemptDoc = InferSchemaType<typeof attemptSchema>;
export const Attempt = model('Attempt', attemptSchema);
