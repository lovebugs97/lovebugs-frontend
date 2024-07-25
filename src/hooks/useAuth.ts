import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse, LogoutRequest } from 'auth-types';
import { ErrorResponse } from 'global-types';
import { formatDateFromISOString } from '../utils/dateUtils.ts';
import { login, logout } from '../services/auth/authService.ts';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.ts';

const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore((state) => state);

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
      navigate('/');
    },
    onError: (error) => {
      console.log('error: ', error);
      setUser(null);
    },
  });

  return { user, setUser, loginMutation, logoutMutation };
};

export default useAuth;
