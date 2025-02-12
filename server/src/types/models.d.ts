import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  speciality: string;
  licenseNumber: string;
  status: string;
  contactInfo: {
    phone: string;
    address?: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  profileImage: {
    url: string;
    key: string;
    uploadAt: Date;
  };
  education: {
    institution: string;
    degree: string;
    year: number;
    counstry: string;
  };
  workingHours?: {
    maxPatientsPerDay?: number;
    preferredAppointmentDuration?: number;
    breakTime?: {
      start?: string;
      end?: string;
    };
  };
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    pushNotifications: boolean;
  };
  signature?: {
    image?: string;
    lastUpdated?: Date;
  };
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPatient extends Document {
  documentId: string;
  documentType: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  contactInfo: {
    phone: string;
    email?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    expirationDate: Date;
  };
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    chronicConditions?: string[];
    currentMedications?: string[];
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAppointment extends Document {
  patientId: Object;
  doctorId: Object;
  date: Date;
  duration: number;
  type: string;
  status: string;
  reason: string;
  notes?: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
    height?: number;
  };
  createdBy: Object;
  createdAt: Date;
  updatedAt: Date;
}
export interface IMedicalRecord extends Document {
  patientId: Object;
  appointmentId?: Object;
  doctorId: Object;
  type: string;
  diagnosis: string[];
  symptoms: string[];
  observations?: string;
  treatment?: {
    plan?: string;
    instructions?: string;
    duration?: string;
  };
  prescriptions?: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  attachments?: Array<{
    type: string;
    url: string;
    description: string;
    uploadedAt: Date;
  }>;
  labResults?: Array<{
    testName: string;
    result: string;
    normalRange: string;
    unit: string;
    date: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInventory extends Document {
  name: string;
  type: string;
  category: string;
  quantity: number;
  unit: string;
  minimumStock?: number;
  location?: string;
  supplier?: {
    name: string;
    contact: string;
    email: string;
  };
  cost?: number;
  expirationDate?: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
