import { roles, specialties, userStatusValues } from '../../types/auth.types';
import { body } from 'express-validator';

export const registerValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('El rol es requerido')
    .isIn(roles)
    .withMessage('Rol no válido'),
  body('firstName').trim().notEmpty().withMessage('El nombre es requerido'),
  body('lastName').trim().notEmpty().withMessage('El apellido es requerido'),
  body('speciality')
    .trim()
    .notEmpty()
    .withMessage('La especialidad es requerida')
    .isIn(specialties)
    .withMessage('Especialidad no válida'),
  body('licenseNumber').trim().notEmpty().withMessage('El número de licencia es requerido'),
  body('status')
    .trim()
    .notEmpty()
    .isIn(userStatusValues)
    .withMessage('El estado del usuario no es válido'),
  body('contactInfo.phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .isLength({ min: 9, max: 15 })
    .withMessage('El teléfono debe tener entre 9 y 15 caracteres')
    .matches(/^(?:6\d{8}|7\d{8}|8\d{8}|9\d{8})$/)
    .withMessage('El teléfono debe ser un número móvil o fijo válido de España con 9 dígitos'),
  body('contactInfo.address')
    .trim()
    .notEmpty()
    .withMessage('La dirección del usuario es requerido'),
  body('contactInfo.emergencyContact.name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del contacto de emergencia es requerido'),
  body('contactInfo.emergencyContact.phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono del contacto de emergencia es requerido')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('El teléfono debe ser un número válido con un prefijo de país opcional'),
];
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];
export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña actual debe tener al menos 6 caracteres'),
  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('La contraseña nueva es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña nueva debe tener al menos 6 caracteres'),
];
