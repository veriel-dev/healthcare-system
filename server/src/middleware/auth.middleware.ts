import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ApiError } from './error.middleware';
import { UserPayload } from '../types/auth.types';

/* const getAuthTokenByCookie = (headers: string[]) => {
  const cookieIndex = headers.findIndex((header) => header === 'Cookie');
  if (cookieIndex !== -1) {
    const cookieValue = headers[cookieIndex + 1];
    const authToken = cookieValue
      .split('; ')
      .find((cookie) => cookie.startsWith('authToken='))?.split("=")[1]
    return authToken
  }
  return null
} */
export const authenticate = async (
  req: Request,
  __res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers.authorization?.split(" ")[1] || getAuthTokenByCookie(req.rawHeaders);
    if (!token) throw new ApiError(401, 'Authentication token required');

    const decodedToken = jwt.decode(token) as UserPayload & { exp?: number; iat?: number };

    if (!decodedToken?.exp || !decodedToken?.iat) {
      throw new ApiError(401, 'Token malformed - missing expiration or issued at time');
    }
    const decoded = jwt.verify(token, config.jwtSecret) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError(401, 'Token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid token'));
    } else {
      next(new ApiError(401, 'Authentication failed'));
    }
  }
};
