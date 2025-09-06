// Filename: libs/data-access/src/lib/payment.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface Payment extends Document {
  userId?: Schema.Types.ObjectId;
  schoolId?: Schema.Types.ObjectId;
  amount: number; // Stored in kobo/cents
  currency: string;
  status: 'pending' | 'successful' | 'failed';
  provider: 'paystack' | 'flutterwave' | 'google_play';
  transactionRef: string;
  createdAt: Date;
}

const paymentSchema = new Schema<Payment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  schoolId: { type: Schema.Types.ObjectId, ref: 'School', index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'NGN' },
  status: { type: String, enum: ['pending', 'successful', 'failed'], required: true },
  provider: { type: String, enum: ['paystack', 'flutterwave', 'google_play'], required: true },
  transactionRef: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentModel = model<Payment>('Payment', paymentSchema);