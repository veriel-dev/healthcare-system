import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserTableRow } from './UserTableRow';
import { Data } from '@/types';
import { SortConfigKey } from '@/pages/dashboard/profile/UsersProfile';

interface UserTableProps {
  users: Data[];
  visibleColumns: Record<string, boolean>;
  sortConfig: { key: string; direction: string };
  onSort: (key: SortConfigKey) => void;
}

export const UserTable = ({ users, visibleColumns, sortConfig, onSort }: UserTableProps) => {
  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.entries(visibleColumns).map(
              ([key, visible]) =>
                visible && (
                  <TableHead
                    key={key}
                    className="cursor-pointer hover:text-emerald-500"
                    onClick={() => onSort(key as SortConfigKey)}
                  >
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortConfig.key === key && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </TableHead>
                ),
            )}
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map(user => (
              <UserTableRow key={user._id} user={user} visibleColumns={visibleColumns} />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}
                className="h-24 text-center"
              >
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
