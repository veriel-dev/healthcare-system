import { DashboardLayout } from '@/components';
import { Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <DashboardLayout
      title="Pefil Profesional"
      description="Gestiona tu información personal y profesional"
      className="profile"
    >
      <Outlet />
    </DashboardLayout>
  );
};
