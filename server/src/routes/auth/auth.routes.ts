import { Router, RequestHandler } from 'express';
import {
  register,
  login,
  me,
  changePassword,
  loginGoogle,
} from '../../controllers/auth/auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { registerValidation, loginValidation, changePasswordValidation } from './validation';
import passport from 'passport';
const router = Router();

router.post('/register', validate(registerValidation) as RequestHandler, register);
router.post('/login', validate(loginValidation) as RequestHandler, login);
router.get('/me', authenticate, me);
router.post(
  '/change-password',
  authenticate,
  validate(changePasswordValidation) as RequestHandler,
  changePassword,
);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), loginGoogle);

export default router;
