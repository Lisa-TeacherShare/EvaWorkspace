// Filename: libs/data-access/src/lib/audit_log.schema.ts
import { Schema, model, Document } from 'mongoose';

export interface AuditLog extends Document {
    school_id: string;
    bursar_id: string;
    action: string; // e.g., "RECORD_PAYMENT"
    details: string; // e.g., "Added 30,000 to Musa"
    timestamp: Date;
}

const auditLogSchema = new Schema<AuditLog>({
    school_id: { type: String, required: true, index: true },
    bursar_id: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const AuditLogModel = model<AuditLog>('AuditLog', auditLogSchema);
