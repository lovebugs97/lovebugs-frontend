import axios from 'axios';
import useAuthStore from '../store/Store.tsx';

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

export type LoginResponseType = {
  id: number;
  email: string;
  name: string;
  profileImage: string | null;
  gender: string;
  createdAt: string;
  lastLoginDate: string;
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponseType>(
    '/auth-service/auth/v1/login',
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};

export default api;
