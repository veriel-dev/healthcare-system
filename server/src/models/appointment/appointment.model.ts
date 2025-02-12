import mongoose, { Schema } from 'mongoose';
import { IAppointment } from '../../types/models';

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, required: true, ref: 'Patient' },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    duration: { type: Number, default: 30 },
    type: { type: String, required: true },
    status: { type: String, required: true },
    reason: { type: String, required: true },
    notes: String,
    vitals: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      weight: Number,
      height: Number,
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

appointmentSchema.index({ patientId: 1, date: 1 });
appointmentSchema.index({ doctorId: 1, date: 1 });
appointmentSchema.index({ date: 1, status: 1 });
appointmentSchema.index({ createdBy: 1 });

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
