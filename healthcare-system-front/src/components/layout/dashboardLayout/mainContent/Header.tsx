import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { config } from '@/config';
import { useAuth } from '@/hooks';
import { Bell, PowerCircle, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  firstName: string | undefined;
  lastName: string | undefined;
  title: string;
  description: string;
}

export const Header = ({ firstName, lastName, title, description }: Props) => {
  const { logout } = useAuth();
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-zinc-800 rounded-full">
          <Bell className="h-5 w-5 text-gray-400" />
        </button>
        <Link to={config.auth.front.settings}>
          <button className="p-2 hover:bg-zinc-800 rounded-full">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 hover:bg-zinc-800 rounded-full">
              <PowerCircle className="h-5 w-5 text-red-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 flex items-center  justify-center flex-col">
              <h4>¿Estás seguro de cerrar sesión?</h4>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  type="button"
                  className="mt-4 mb-2 text-center w-full border-teal-500 text-teal-400"
                  onClick={logout}
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-lg">
          <User className="h-5 w-5 text-emerald-400" />
          <span className="text-sm">{`${firstName} ${lastName}`}</span>
        </div>
      </div>
    </header>
  );
};
