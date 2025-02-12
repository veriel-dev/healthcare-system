import mongoose, { Schema } from 'mongoose';
import { IMedicalRecord } from '../../types/models';

const medicalRecordSchema = new Schema<IMedicalRecord>(
  {
    patientId: { type: Schema.Types.ObjectId, required: true, ref: 'Patient' },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    diagnosis: [Schema.Types.Mixed],
    symptoms: [Schema.Types.Mixed],
    observations: String,
    treatment: {
      plan: String,
      instructions: String,
      duration: String,
    },
    prescriptions: [
      {
        medication: String,
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String,
      },
    ],
    attachments: [
      {
        type: String,
        url: String,
        description: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    labResults: [
      {
        testName: String,
        result: String,
        normalRange: String,
        unit: String,
        date: Date,
      },
    ],
  },
  { timestamps: true },
);

medicalRecordSchema.index({ patientId: 1, createdAt: -1 });
medicalRecordSchema.index({ doctorId: 1, createdAt: -1 });
medicalRecordSchema.index({ appointmentId: 1 });
medicalRecordSchema.index({ type: 1 });

export const MedicalRecord = mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);
