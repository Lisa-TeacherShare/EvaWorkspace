// Filename: libs/data-access/src/lib/school.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface SchoolSettings {
  block_debtors_from_cbt: boolean;
  ai_credits: number;
}

export interface SchoolApiKeys {
  openai?: string;
  gemini?: string;
}

export interface School extends Document {
  name: string;
  address: string;
  adminIds: Schema.Types.ObjectId[];
  settings: SchoolSettings;
  api_keys: SchoolApiKeys;
  createdAt: Date;
}

const schoolSchema = new Schema<School>({
  name: { type: String, required: true, trim: true, unique: true },
  address: { type: String, required: true },
  adminIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  settings: {
    block_debtors_from_cbt: { type: Boolean, default: false },
    ai_credits: { type: Number, default: 0 },
  },
  api_keys: {
    openai: { type: String, select: false },
    gemini: { type: String, select: false },
  },
  createdAt: { type: Date, default: Date.now },
});

export const SchoolModel = model<School>('School', schoolSchema);