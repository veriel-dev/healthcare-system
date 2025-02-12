// utils/jwt.ts
import { config } from '../config/config';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpirationInterval,
  });
};
