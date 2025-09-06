// Filename: libs/data-access/src/lib/user.schema.ts
import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interfaces for our User documents
export interface Subscription {
  plan: 'lite' | 'premium' | 'none';
  status: 'active' | 'inactive' | 'cancelled';
  expiresAt?: Date;
  deviceId?: string; // For Eva Lite single-device lock
}

export interface BaseUser extends Document {
  firebaseUid: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: 'Admin' | 'Teacher' | 'Student';
  createdAt: Date;
}

export interface Teacher extends BaseUser {
  schoolId: Schema.Types.ObjectId;
}

export interface Student extends BaseUser {
  schoolId?: Schema.Types.ObjectId;
  educationLevel: 'Primary' | 'Junior' | 'Senior';
  subscription: Subscription;
}

// Mongoose Discriminator Setup
const baseUserOptions = {
  discriminatorKey: 'accountType',
  collection: 'users',
};

const userSchema = new Schema<BaseUser>({
  firebaseUid: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, baseUserOptions);

export const User = model<BaseUser>('User', userSchema);

export const Admin = User.discriminator<BaseUser>('Admin', new Schema({}));

export const TeacherModel = User.discriminator<Teacher>('Teacher', new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true, index: true },
}));

export const StudentModel = User.discriminator<Student>('Student', new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: 'School', index: true },
  educationLevel: { type: String, enum: ['Primary', 'Junior', 'Senior'], required: true },
  subscription: {
    plan: { type: String, enum: ['lite', 'premium', 'none'], default: 'none' },
    status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'inactive' },
    expiresAt: { type: Date },
    deviceId: { type: String },
  }
}));