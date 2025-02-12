export interface IUser {
  success: boolean;
  data: Data;
}
export interface IUserResponse<T> {
  success: boolean;
  data: T;
}

export interface Data {
  contactInfo: ContactInfo;
  _id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  speciality: string;
  licenseNumber: string;
  status: string;
  schedule: Schedule[];
  education: Education;
  workingHours?: WorkingHours;
  notificationPreferences: NotificationPreferences;
  profileImage?: ProfileImage;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  country: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface WorkingHours {
  maxPatientsPerDay: number;
  preferredAppointmentDuration: number;
  breakTime: BreakTime;
}

export interface BreakTime {
  start: Date;
  end: Date;
}
export interface ProfileImage {
  url: string;
  key: string;
  uploadedAt: Date;
}

export interface ContactInfo {
  emergencyContact: EmergencyContact;
  phone: string;
  address: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  _id: string;
}

export interface ResponseLogin {
  success: boolean;
  data: DataLogin;
}

export interface DataLogin {
  user: UserLogin;
  token: string;
}

export interface UserLogin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
}
