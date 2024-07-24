import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/Store.tsx';
import { LoginRequest, LoginResponse, LogoutRequest } from 'auth-types';
import { ErrorResponse } from 'global-types';
import { formatDateFromISOString } from '../utils/dateUtils.ts';
import { login, logout } from '../services/auth/authService.ts';

const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation<LoginResponse, ErrorResponse, LoginRequest>({
    mutationFn: async ({ email, password }) => await login(email, password),
    onSuccess: (data) => {
      const formatted: LoginResponse = {
        ...data,
        createdAt: formatDateFromISOString(data.createdAt),
        lastLoginDate: data.lastLoginDate ? formatDateFromISOString(data.lastLoginDate) : null,
      };

      setUser(formatted);
    },
    onError: (error) => {
      console.log('Login Error:', error);
    },
  });

  const logoutMutation = useMutation<void, ErrorResponse, LogoutRequest>({
    mutationFn: async (logoutRequest) => await logout(logoutRequest),
    onSuccess: () => {
      setUser(null); /* setUser(null) -> 자동으로 localStorage에 담긴 user 정보 삭제 */
    },
    onError: (error) => {
      console.log('error: ', error);
      setUser(null);
    },
  });

  return { loginMutation, logoutMutation };
};

export default useAuth;
