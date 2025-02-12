import mongoose, { Schema } from 'mongoose';
import { IPatient } from '../../types/models';

const patientSchema = new Schema<IPatient>(
  {
    documentId: { type: String, required: true, unique: true },
    documentType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
    },
    emergencyContact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relationship: { type: String, required: true },
    },
    insurance: {
      provider: String,
      policyNumber: String,
      expirationDate: Date,
    },
    medicalInfo: {
      bloodType: String,
      allergies: [String],
      chronicConditions: [String],
      currentMedications: [String],
    },
    status: { type: String, required: true, default: 'active' },
  },
  { timestamps: true },
);

// patientSchema.index({ documentId: 1 }, { unique: true });
patientSchema.index({ lastName: 1, firstName: 1 });
patientSchema.index({ 'insurance.policyNumber': 1 });

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);
