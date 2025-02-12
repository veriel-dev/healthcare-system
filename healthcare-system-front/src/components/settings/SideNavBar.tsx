import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}
export const SideNavBar = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = useLocation().pathname;
  return (
    <nav
      className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}
    >
      {items.map(item => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'hover:bg-transparent hover:text-emerald-500',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
