import { config } from '@/config';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { createRouteRegex } from '@/utils/createRouteRegex';
import { Users2, Calendar, FileText, Activity, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  icon: LucideIcon;
  text: string;
}
type Role = 'admin' | 'doctor' | 'receptionist' | 'nurse';
type Elements = Record<Role, NavItem[]>;

interface NavLink extends NavItem {
  handleShow: () => void;
  subMenu: boolean;
  isOpen: boolean;
  sublinks: NavItem[];
}

export const ProfileSideBar = () => {
  const pathName = useLocation().pathname;
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const { user } = useAuth();
  const role = user?.data.role as Role;

  const elements: Elements = {
    admin: [
      {
        to: config.auth.front.routesProfile.users,
        icon: Users2,
        text: 'Users',
      },
      {
        to: config.auth.front.routesProfile.patients,
        icon: Users2,
        text: 'Pacientes',
      },
      {
        to: config.auth.front.routesProfile.calendar,
        icon: Calendar,
        text: 'Calendario',
      },
      {
        to: config.auth.front.routesProfile.reports,
        icon: FileText,
        text: 'Reportes',
      },
    ],
    doctor: [
      {
        to: config.auth.front.routesProfile.patients,
        icon: Users2,
        text: 'Pacientes',
      },
      {
        to: config.auth.front.routesProfile.calendar,
        icon: Calendar,
        text: 'Calendario',
      },
      {
        to: config.auth.front.routesProfile.reports,
        icon: FileText,
        text: 'Reportes',
      },
    ],
    receptionist: [
      {
        to: config.auth.front.routesProfile.users,
        icon: Users2,
        text: 'Users',
      },
    ],
    nurse: [
      {
        to: config.auth.front.routesProfile.patients,
        icon: Users2,
        text: 'Pacientes',
      },
      {
        to: config.auth.front.routesProfile.calendar,
        icon: Calendar,
        text: 'Calendario',
      },
      {
        to: config.auth.front.routesProfile.reports,
        icon: FileText,
        text: 'Reportes',
      },
    ],
  };
  const links: NavLink = {
    to: config.auth.front.profile,
    icon: Activity,
    text: 'Dashboard',
    handleShow: () => setIsDashboardOpen(prevState => !prevState),
    subMenu: true,
    isOpen: isDashboardOpen,
    sublinks: elements[role],
  };
  return (
    <div>
      <div
        className={cn(
          'dashboard-layout__sidebar-profile',
          createRouteRegex(links.to).test(pathName) && 'bg-zinc-800  border-emerald-500',
        )}
      >
        <Link to={links.to}>
          <div className="flex items-center">
            <Activity className="mr-3 h-5 w-5" />
            <span>{links.text}</span>
          </div>
        </Link>
        <ChevronDown
          className={cn(
            'dashboard-layout__sidebar-profile-chevrondown',
            links.isOpen && ['rotate-180'],
          )}
          onClick={links.handleShow}
        />
      </div>
      <div
        className={cn(
          'dashboard-layout__sidebar-profile-container-link',
          links.isOpen ? ['max-h-auto', 'opacity-100'] : ['max-h-0', 'opacity-0'],
        )}
      >
        <div className="py-2 ">
          {links.sublinks?.map((sublink, subIndex) => (
            <Link
              key={subIndex}
              to={sublink.to}
              className={cn(
                'dashboard-layout__sidebar-profile-link',
                createRouteRegex(sublink.to).test(pathName) && 'text-emerald-400 ',
              )}
            >
              <sublink.icon className="mr-3 h-4 w-4" />
              <span>{sublink.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
