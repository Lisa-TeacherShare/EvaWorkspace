// Filename: libs/data-access/src/lib/student.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface StudentFees {
    term_bill: number;
    amount_paid: number;
    status: 'cleared' | 'partial' | 'owing';
    last_updated_by?: string;
}

export interface Student extends Document {
    _id: string; // Explicitly string as per spec example "std_555", though Mongo uses ObjectId usually. keeping it flexible.
    name: string;
    school_id: string;
    fees: StudentFees;
    qr_code_string: string;
    createdAt: Date;
}

const studentSchema = new Schema<Student>({
    _id: { type: String, required: true }, // Overriding default ObjectId if we want custom string IDs like "std_555"
    name: { type: String, required: true },
    school_id: { type: String, required: true, index: true },
    fees: {
        term_bill: { type: Number, default: 0 },
        amount_paid: { type: Number, default: 0 },
        status: { type: String, enum: ['cleared', 'partial', 'owing'], default: 'owing' },
        last_updated_by: { type: String },
    },
    qr_code_string: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const StudentModel = model<Student>('Student', studentSchema);
