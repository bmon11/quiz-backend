import { Schema, model, InferSchemaType } from 'mongoose';
import { LSchema } from '../shared/l10n';

const topicSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    color: { type: String, default: '#00A76F' },
    icon: { type: String, default: '' },
    title: { type: LSchema, required: true },
    tagline: { type: LSchema, required: true },
    description: { type: LSchema, required: true },
    effect: { type: String, default: '' },
    // "admin" = a category created in the admin page; the seed leaves those alone.
    origin: { type: String, enum: ['seed', 'admin'], default: 'seed' },
    // Who added it in the admin page — a contributor may edit only their own.
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export type TopicDoc = InferSchemaType<typeof topicSchema>;
export const Topic = model('Topic', topicSchema);
