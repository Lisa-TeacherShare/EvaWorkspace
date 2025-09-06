// Filename: libs/data-access/src/lib/question.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question extends Document {
  questionText: string;
  imageUrl?: string;
  options: Option[];
  explanation?: string;
  educationLevel: 'Primary' | 'Junior' | 'Senior';
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const optionSchema = new Schema<Option>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
}, { _id: false });

const questionSchema = new Schema<Question>({
  questionText: { type: String, required: true },
  imageUrl: { type: String },
  options: [optionSchema], // Embedded options
  explanation: { type: String },
  educationLevel: { type: String, enum: ['Primary', 'Junior', 'Senior'], required: true, index: true },
  subject: { type: String, required: true, index: true },
  topic: { type: String, required: true, index: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const QuestionModel = model<Question>('Question', questionSchema);