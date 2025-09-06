// Filename: libs/data-access/src/lib/school.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface SchoolSubscription {
  plan: 'standard' | 'premium' | 'none';
  status: 'active' | 'inactive' | 'cancelled';
  expiresAt?: Date;
}

export interface School extends Document {
  name: string;
  address: string;
  adminIds: Schema.Types.ObjectId[];
  subscription: SchoolSubscription;
  createdAt: Date;
}

const schoolSchema = new Schema<School>({
  name: { type: String, required: true, trim: true, unique: true },
  address: { type: String, required: true },
  adminIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  subscription: {
    plan: { type: String, enum: ['standard', 'premium', 'none'], default: 'none' },
    status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'inactive' },
    expiresAt: { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
});

export const SchoolModel = model<School>('School', schoolSchema);