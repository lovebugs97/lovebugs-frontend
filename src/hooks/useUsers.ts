import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { findUsers } from '../services/auth/authService.ts';
import { FindUsersResponse, Page } from 'auth-types';

const useUsers = () => {
  const [page, setPage] = useState(0);

  const findUserQuery = useQuery<Page<FindUsersResponse>>({
    queryKey: [`findUsers`, page],
    queryFn: async () => await findUsers(page, 10),
  });

  return {
    page,
    handlePageChange: (page: number) => setPage(page),
    findUserData: findUserQuery.data,
  };
};

export default useUsers;
