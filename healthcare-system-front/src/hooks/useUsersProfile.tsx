import { userService } from '@/api';
import { SortConfigDirection, SortConfigKey, User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

interface UseUsersProps {
  token: string;
  currentUserId?: string;
  itemsPerPage?: number;
}

export const useUsersProfile = ({ token, currentUserId, itemsPerPage = 10 }: UseUsersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: SortConfigKey;
    direction: SortConfigDirection;
  }>({
    key: '',
    direction: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    _id: true,
    email: true,
    firstName: true,
    lastName: true,
    licenseNumber: true,
    role: true,
    speciality: true,
    status: true,
  });
  const {
    data: usersResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users', token],
    queryFn: async () => await userService.getAll(token),
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });

  const usersData = useMemo(() => {
    if (!usersResponse?.data) return [];
    return currentUserId
      ? usersResponse.data.filter(element => element._id !== currentUserId)
      : usersResponse.data;
  }, [usersResponse?.data, currentUserId]);

  const handleSort = (key: SortConfigKey) => {
    let direction = 'asc' as SortConfigDirection;
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    if (!usersData.length) return [];

    return usersData
      .filter((item: User) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (item.firstName?.toLowerCase() || '').includes(searchLower) ||
          (item.email?.toLowerCase() || '').includes(searchLower)
        );
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [usersData, searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  return {
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
    hasNextPage: paginatedData.length === itemsPerPage,
  };
};
