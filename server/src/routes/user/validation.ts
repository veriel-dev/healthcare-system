import { body } from 'express-validator';

export const createUserValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('role').isIn(['admin', 'doctor', 'nurse', 'receptionist']),
  body('contactInfo.phone').notEmpty(),
];
