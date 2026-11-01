import { Schema } from 'mongoose';

/** Bilingual text stored as { en, mn }. The web app picks the language. */
export const LSchema = new Schema({ en: { type: String, default: '' }, mn: { type: String, default: '' } }, { _id: false });
