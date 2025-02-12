import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { RequestHandler, Router } from 'express';
import { Role } from '../../types/auth.types';
import {
  createPatient,
  getPatientById,
  getPatients,
  updatePatient,
  deletePatient,
} from '../../controllers/patient/patient.controller';
import { validate } from '../../middleware/validate.middleware';
import { createPatientValidation, updatePatientValidation } from './validation';

const adminDoctorNurseMiddleware: RequestHandler[] = [
  authenticate,
  authorize([Role.ADMIN, Role.DOCTOR, Role.NURSE]),
];
const adminDoctorMiddleware: RequestHandler[] = [
  authenticate,
  authorize([Role.ADMIN, Role.DOCTOR]),
];

const router = Router();

router.get('/', ...adminDoctorNurseMiddleware, getPatients);
router.get('/:id', ...adminDoctorNurseMiddleware, getPatientById);
router.post(
  '/',
  ...adminDoctorMiddleware,
  validate(createPatientValidation) as RequestHandler,
  createPatient,
);
router.put(
  '/:id',
  ...adminDoctorMiddleware,
  validate(updatePatientValidation) as RequestHandler,
  updatePatient,
);

router.delete('/:id', authenticate, authorize([Role.ADMIN]), deletePatient);
export default router;
