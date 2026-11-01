import { Schema, model, InferSchemaType } from 'mongoose';
import { LSchema } from '../shared/l10n';

const lessonSchema = new Schema(
  {
    topicSlug: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    title: { type: LSchema, required: true },
    summary: { type: LSchema, required: true },
    body: { type: LSchema, required: true },
    // Chart/tree/cards payload — shape is the `Visual` union in seed/types.ts.
    // Seed lessons are authored in code; admin lessons get a simple cards visual.
    visual: { type: Schema.Types.Mixed, required: true },
    funFacts: { type: [LSchema], default: [] },
    // Map of the places the visual lists ({ map, unit?, items }) — geography lessons only.
    map: { type: Schema.Types.Mixed, default: null },
    // "admin" = created in the admin page; the seed leaves those alone.
    origin: { type: String, enum: ['seed', 'admin'], default: 'seed' },
    // Who added it in the admin page — a contributor may edit only their own.
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

lessonSchema.index({ topicSlug: 1, order: 1 });

export type LessonDoc = InferSchemaType<typeof lessonSchema>;
export const Lesson = model('Lesson', lessonSchema);
