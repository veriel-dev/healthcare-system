import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';
import { Loading } from '@/components';
import { authService } from '../../api/auth';

interface Props {
  children: React.ReactNode;
}
interface LoginCredentials {
  email: string;
  password: string;
}

const TOKEN_KEY = 'token';

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['auth', token],
    queryFn: () => authService.getMe(token),
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  }, [queryClient]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await authService.login(credentials);
        const newToken = response.data.token;

        if (!newToken) throw new Error('No token received from server');

        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);

        await queryClient.prefetchQuery({
          queryKey: ['auth', newToken],
          queryFn: () => authService.getMe(newToken),
        });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [queryClient],
  );

  const handleLoginGoogle = useCallback(
    async (token: string) => {
      try {
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
        await queryClient.prefetchQuery({
          queryKey: ['auth', token],
          queryFn: () => authService.getMe(token),
        });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [queryClient],
  );

  useEffect(() => {
    if (isError) logout();
  }, [isError, logout]);

  const contextValue = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading: isLoading || isFetching,
    handleLogin,
    handleLoginGoogle,
    logout,
    token,
  };
  if (isLoading && !user) return <Loading />;

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
