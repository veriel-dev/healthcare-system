export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
}

export enum Speciality {
  ALLERGY_AND_IMMUNOLOGY = 'Allergy and Immunology',
  ANESTHESIOLOGY = 'Anesthesiology',
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  EMERGENCY_MEDICINE = 'Emergency Medicine',
  ENDOCRINOLOGY = 'Endocrinology',
  FAMILY_MEDICINE = 'Family Medicine',
  GASTROENTEROLOGY = 'Gastroenterology',
  GENERAL_SURGERY = 'General Surgery',
  GERIATRICS = 'Geriatrics',
  HEMATOLOGY = 'Hematology',
  INFECTIOUS_DISEASE = 'Infectious Disease',
  INTERNAL_MEDICINE = 'Internal Medicine',
  NEPHROLOGY = 'Nephrology',
  NEUROLOGY = 'Neurology',
  NEUROSURGERY = 'Neurosurgery',
  OBSTETRICS_AND_GYNECOLOGY = 'Obstetrics and Gynecology',
  ONCOLOGY = 'Oncology',
  OPHTHALMOLOGY = 'Ophthalmology',
  ORTHOPEDICS = 'Orthopedics',
  OTOLARYNGOLOGY = 'Otolaryngology (ENT)',
  PATHOLOGY = 'Pathology',
  PEDIATRICS = 'Pediatrics',
  PHYSICAL_MEDICINE_AND_REHABILITATION = 'Physical Medicine and Rehabilitation',
  PLASTIC_SURGERY = 'Plastic Surgery',
  PSYCHIATRY = 'Psychiatry',
  PULMONOLOGY = 'Pulmonology',
  RADIOLOGY = 'Radiology',
  RHEUMATOLOGY = 'Rheumatology',
  UROLOGY = 'Urology',
  VASCULAR_SURGERY = 'Vascular Surgery',
}
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  DELETED = 'deleted',
}
export enum RelationShip {
  SPOUSE = 'spouse',
  PARENT = 'parent',
  SIBLING = 'sibling',
  FRIEND = 'friend',
}

export const specialties = Object.values(Speciality);
export const roles = Object.values(Role);
export const userStatusValues = Object.values(UserStatus);
export const relationShipValues = Object.values(RelationShip);
