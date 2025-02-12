import { config } from '@/config';
import { useAuth } from '@/hooks';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={config.auth.front.login} replace />;
  }
  return <>{children}</>;
};
