import { useMutation } from '@tanstack/react-query';
import { login, logout } from '../services/api.ts';
import { useAuthStore } from '../store/Store.tsx';
import { LoginRequest, LoginResponse } from 'auth-types';
import { ErrorResponse } from 'global-types';

const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation<LoginResponse, ErrorResponse, LoginRequest>({
    mutationFn: async ({ email, password }) => await login(email, password),
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.log('error: ', error);
    },
  });

  const logoutMutation = useMutation<void, ErrorResponse, number>({
    mutationFn: async (id) => await logout(id),
    onSuccess: () => {
      setUser(null); /* setUser(null) -> 자동으로 localStorage에 담긴 user 정보 삭제 */
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  });

  return { loginMutation, logoutMutation };
};

export default useAuth;
