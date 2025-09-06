// Filename: libs/data-access/src/lib/examResult.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface Answer extends Document {
  questionId: Schema.Types.ObjectId;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface ExamResult extends Document {
  studentId: Schema.Types.ObjectId;
  schoolId?: Schema.Types.ObjectId;
  examName: string;
  score: number;
  totalQuestions: number;
  answers: Answer[];
  takenAt: Date;
}

const answerSchema = new Schema<Answer>({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOptionIndex: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
}, { _id: false });

const examResultSchema = new Schema<ExamResult>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  schoolId: { type: Schema.Types.ObjectId, ref: 'School', index: true },
  examName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  answers: [answerSchema],
  takenAt: { type: Date, default: Date.now, index: true },
});

export const ExamResultModel = model<ExamResult>('ExamResult', examResultSchema);