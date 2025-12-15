// Filename: libs/data-access/src/lib/license.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface LicenseKey extends Document {
    code: string;
    batch_id: string;
    status: 'active' | 'used' | 'revoked';
    used_by_device_id?: string;
    activated_at?: Date;
    createdAt: Date;
}

const licenseKeySchema = new Schema<LicenseKey>({
    code: { type: String, required: true, unique: true },
    batch_id: { type: String, required: true },
    status: { type: String, enum: ['active', 'used', 'revoked'], default: 'active' },
    used_by_device_id: { type: String },
    activated_at: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

export const LicenseKeyModel = model<LicenseKey>('LicenseKey', licenseKeySchema);
