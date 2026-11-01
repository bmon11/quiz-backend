import { Schema, model, InferSchemaType } from 'mongoose';

/** A player account. Email + password, Google sign-in, or both on one email. */
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: '' },
    avatar: { type: String, default: '' },
    passwordHash: { type: String, select: false },
    googleId: { type: String, index: { unique: true, sparse: true } },
    // ADMIN_EMAILS (env) also grants admin — see roleOf().
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    lastSeenAt: { type: Date },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: unknown };
export const User = model('User', userSchema);
