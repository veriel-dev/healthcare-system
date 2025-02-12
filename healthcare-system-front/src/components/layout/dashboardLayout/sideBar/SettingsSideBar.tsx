import { config } from '@/config';
import { cn } from '@/lib/utils';
import { createRouteRegex } from '@/utils/createRouteRegex';
import { Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const SettingsSideBar = () => {
  const pathName = useLocation().pathname;

  return (
    <Link
      to={config.auth.front.settings}
      className={cn(
        'dashboard-layout__sidebar-settings',
        createRouteRegex(config.auth.front.settings).test(pathName) &&
          'bg-zinc-800  border-emerald-500',
      )}
    >
      <div className="flex items-center">
        <Settings className="mr-3 h-5 w-5" />
        <span>Configuración</span>
      </div>
    </Link>
  );
};
