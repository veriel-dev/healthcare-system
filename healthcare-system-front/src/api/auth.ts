import { config } from '@/config';
import { IUser, ResponseLogin } from '@/types';
import { handleRequest } from './basic';

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    handleRequest<ResponseLogin>({
      method: 'POST',
      url: config.auth.backend.fullRoutes.login,
      data: credentials,
    }),

  getMe: (token?: string) =>
    handleRequest<IUser>(
      {
        method: 'GET',
        url: config.auth.backend.fullRoutes.me,
      },
      token,
    ),
};
