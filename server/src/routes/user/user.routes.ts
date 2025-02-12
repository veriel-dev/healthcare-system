import { authorize } from '../../middleware/authorize.middleware';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user/user.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { RequestHandler, Router } from 'express';
import { Role } from '../../types/auth.types';
import { createUserValidation } from './validation';

const router = Router();
const adminReceptionistMiddleware: RequestHandler[] = [
  authenticate,
  authorize([Role.ADMIN, Role.RECEPTIONIST]),
];

router.get('/', ...adminReceptionistMiddleware, getAllUsers);
router.get('/:id', ...adminReceptionistMiddleware, getUserById);
router.post(
  '/',
  ...adminReceptionistMiddleware,
  validate(createUserValidation) as RequestHandler,
  createUser,
);
router.put('/:id', ...adminReceptionistMiddleware, updateUser);
router.delete('/:id', ...adminReceptionistMiddleware, deleteUser);

export default router;
