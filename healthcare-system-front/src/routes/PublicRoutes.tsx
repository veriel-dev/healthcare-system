import { config } from '@/config';
import { useAuth } from '@/hooks';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}
export const PublicRoutes = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={config.auth.front.profile} replace />;
  }
  return <>{children}</>;
};
