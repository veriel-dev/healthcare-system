import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../auth.types';

declare global {
  namespace Express {
    interface Request {
      user?:
        | JwtPayload
        | { id: string; email: string; role: Role }
        | { googleId: string; email: string | undefined; name: string };
    }
  }
}
