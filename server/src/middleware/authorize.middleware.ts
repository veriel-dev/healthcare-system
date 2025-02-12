import { Request, Response, NextFunction } from 'express';
import { ApiError } from './error.middleware';
import { Role } from '../types/auth.types';
import { isCustomUser } from '../utils/type-guard-users';

/**
 * Middleware para autorizar reoles específicos
 * @param allowRoles - Array de roles permitidos
 */
export const authorize = (allowRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError(401, 'User not found in request');
      /* Type guards */
      if (!isCustomUser(req.user)) {
        throw new ApiError(401, 'Invalid user object format.');
      }
      if (!allowRoles.includes(req.user.role))
        throw new ApiError(403, 'Not have permissions to access this resource');

      next();
    } catch (error) {
      next(error);
    }
  };
};
