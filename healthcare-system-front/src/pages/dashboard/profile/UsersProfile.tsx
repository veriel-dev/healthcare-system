import { useAuth, useUsersProfile } from '@/hooks';
import {
  SearchBar,
  ColumnSelector,
  UserTable,
  Pagination,
  Loading,
  CardLayout,
  DonutChartCustom,
  ActivityChartCustom,
} from '@/components';
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  role: string;
  speciality: string;
  status: string;
}
type UserKey = keyof User;
export type SortConfigKey = UserKey | '';
export type SortConfigDirection = 'asc' | 'desc' | '';
export const UsersProfile = () => {
  const { token, user } = useAuth();

  const {
    users: paginatedData,
    allUsers: usersData,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    visibleColumns,
    setVisibleColumns,
    hasNextPage,
  } = useUsersProfile({
    token,
    currentUserId: user?.data?._id,
    itemsPerPage: 10,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error al cargar los usuarios
      </div>
    );
  }
  if (!usersData.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No hay usuarios disponibles.
      </div>
    );
  }
  return (
    <>
      <div className="w-full space-y-4 col-span-3">
        <div className="flex items-center justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ColumnSelector
            visibleColumns={visibleColumns}
            onColumnChange={(key, checked) =>
              setVisibleColumns(prev => ({ ...prev, [key]: checked }))
            }
          />
        </div>

        <UserTable
          users={paginatedData}
          visibleColumns={visibleColumns}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          hasNextPage={hasNextPage}
        />
      </div>

      <CardLayout title="Distribución por Rol">
        <DonutChartCustom roles={usersData.map((user: { role: string }) => user.role)} />
      </CardLayout>
      <CardLayout title="Actividad de Usuarios">
        <ActivityChartCustom
          lastLogin={usersData.map((user: { lastLogin: string }) => user.lastLogin)}
        />
      </CardLayout>
    </>
  );
};
