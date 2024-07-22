import { useMutation } from '@tanstack/react-query';
import { login } from '../services/api.ts';
import { useAuthStore } from '../store/Store.tsx';
import { AxiosError } from 'axios';
import { LoginError, LoginRequest, LoginResponse } from 'login-types';

const useAuth = () => {
  const isError = useAuthStore((state) => state.isError);
  const token = useAuthStore((state) => state.token);

  const loginMutation = useMutation<LoginResponse, AxiosError<LoginError>, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      return await login(email, password);
    },
    onSuccess: (data) => {
      useAuthStore.getState().setToken(data.accessToken);
      useAuthStore.getState().setUser(data);
      useAuthStore.getState().setIsError(false);
    },
    onError: (error) => {
      console.error(error);
      useAuthStore.getState().setIsError(true);
    },
  });

  return { token, isError, loginMutation };
};

export default useAuth;
