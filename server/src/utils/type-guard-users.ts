import { Role } from '../types/auth.types';
import { JwtPayload } from 'jsonwebtoken';

export const isCustomUser = (
  user:
    | JwtPayload
    | { id: string; email: string; role: Role }
    | { googleId: string; email: string; name?: string },
): user is { id: string; email: string; role: Role } => {
  // Verifica si el usuario es un "custom user" (tiene una propiedad `role`)
  return (user as { id: string; email: string; role: Role }).role !== undefined;
};

export const isGoogleUser = (
  user:
    | JwtPayload
    | { id: string; email: string; role: Role }
    | { googleId: string; email: string; name?: string },
): user is { googleId: string; email: string; name?: string } => {
  // Verifica si el usuario es un "Google user" (tiene una propiedad `googleId`)
  return (user as { googleId: string; email: string; name?: string }).googleId !== undefined;
};
