import axios from 'axios';
import { useAuthStore } from '../store/Store.tsx';
import { LoginResponse } from 'login-types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>(
    '/auth-service/auth/v1/login',
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};

export default api;
