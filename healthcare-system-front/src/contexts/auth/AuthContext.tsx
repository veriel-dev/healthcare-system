import { createContext } from 'react';
import { IUser } from '@/types';

interface AuthContextProps {
  user: IUser | null | undefined;
  isAuthenticated: boolean;
  logout: () => void;
  handleLogin: (body: { email: string; password: string }) => Promise<void>;
  handleLoginGoogle: (token: string) => Promise<void>;
  isLoading: boolean;
  token: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
