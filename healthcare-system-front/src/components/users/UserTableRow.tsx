import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { config } from '@/config';
import { Data } from '@/types';

interface UserTableRowProps {
  user: Data;
  visibleColumns: Record<string, boolean>;
}

export const UserTableRow = ({ user, visibleColumns }: UserTableRowProps) => {
  return (
    <TableRow key={user._id}>
      {Object.entries(visibleColumns).map(
        ([key, visible]) =>
          visible && (
            <TableCell key={key} className={`${key != 'email' && 'capitalize'}`}>
              {key === 'status' ? (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user[key] === 'active'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {user[key]}
                </span>
              ) : (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                user[key]
              )}
            </TableCell>
          ),
      )}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:text-emerald-500">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`${config.auth.front.routesProfile.users}/${user._id}`}>Ver detalles</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Editar usuario</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Eliminar usuario</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
