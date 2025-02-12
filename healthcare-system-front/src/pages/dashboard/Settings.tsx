import { DashboardLayout, SideNavBar } from '@/components';
import { Outlet } from 'react-router-dom';
import { config } from '@/config';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: config.auth.front.routesSettings.profile,
  },
  {
    title: 'Account',
    href: config.auth.front.routesSettings.account,
  },
  {
    title: 'Appearance',
    href: config.auth.front.routesSettings.appearance,
  },
  {
    title: 'Notifications',
    href: config.auth.front.routesSettings.notifications,
  },
  {
    title: 'Display',
    href: config.auth.front.routesSettings.display,
  },
];

export const Settings = () => {
  return (
    <DashboardLayout
      title="Settings"
      description="Manage your account settings and set e-mail preferences"
      className="settings"
    >
      <aside className="-mx-4 lg:w-1/5">
        <SideNavBar items={sidebarNavItems} />
      </aside>
      <div className="flex-1 lg:max-w-2xl">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};
