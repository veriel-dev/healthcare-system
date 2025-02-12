import { body } from 'express-validator';

export const createPatientValidation = [
  body('firstName').trim().notEmpty().withMessage('El nombre es requerido'),
  body('lastName').trim().notEmpty().withMessage('El apellido es requerido'),
  body('dateOfBirth').isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('El género debe ser male, female u other'),
  body('contactInfo.phone').trim().notEmpty().withMessage('El teléfono es requerido'),
  // body('contactInfo.address')
  //   .trim()
  //   .notEmpty()
  //   .withMessage('La dirección es requerida'),
  body('contactInfo.email').optional().isEmail().withMessage('El email debe ser válido'),
  body('emergencyContact.name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del contacto de emergencia es requerido'),
  body('emergencyContact.phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono del contacto de emergencia es requerido'),
  body('emergencyContact.relationship')
    .trim()
    .notEmpty()
    .withMessage('La relación del contacto de emergencia es requerida'),
];
export const updatePatientValidation = [
  // Datos personales
  body('firstName').optional().trim().notEmpty().withMessage('El nombre es requerido'),

  body('lastName').optional().trim().notEmpty().withMessage('El apellido es requerido'),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida'),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('El género debe ser male, female u other'),

  // Información de contacto
  body('contactInfo.email').optional().trim().isEmail().withMessage('El email debe ser válido'),

  body('contactInfo.phone').optional().trim().notEmpty().withMessage('El teléfono es requerido'),

  body('contactInfo.address').optional().trim().notEmpty().withMessage('La dirección es requerida'),

  // Información médica
  body('medicalInfo.bloodType')
    .optional()
    .trim()
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Tipo de sangre no válido'),

  body('medicalInfo.allergies').optional().isArray().withMessage('Las alergias deben ser un array'),

  body('medicalInfo.allergies.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La alergia no puede estar vacía'),

  body('medicalInfo.chronicConditions')
    .optional()
    .isArray()
    .withMessage('Las condiciones crónicas deben ser un array'),

  body('medicalInfo.chronicConditions.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La condición crónica no puede estar vacía'),

  // Contacto de emergencia
  body('emergencyContact.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del contacto de emergencia es requerido'),

  body('emergencyContact.phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El teléfono del contacto de emergencia es requerido'),

  body('emergencyContact.relationship')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La relación del contacto de emergencia es requerida'),

  // Información del seguro
  body('insuranceInfo.provider')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El proveedor del seguro es requerido'),

  body('insuranceInfo.policyNumber')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El número de póliza es requerido'),
];
