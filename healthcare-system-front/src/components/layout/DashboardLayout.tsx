import { useAuth } from '@/hooks';
import { Header, SideBar } from './dashboardLayout';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  className: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description,
  className = 'dashboard-layout__grid',
}) => {
  const { user } = useAuth();
  return (
    <div className="dashboard-layout">
      <SideBar />
      <main className="dashboard-layout__main">
        <Header
          firstName={user?.data.firstName}
          lastName={user?.data.lastName}
          title={title}
          description={description}
        />
        <div className={cn(className)}>{children}</div>
      </main>
    </div>
  );
};
