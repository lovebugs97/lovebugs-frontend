import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'global-types';
import { LoginResponse } from 'auth-types';
import { decryptData } from '../utils/cryptoUtils.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const decryptedUser = localStorage.getItem('user');
  if (decryptedUser) {
    const user = decryptData<LoginResponse>(decryptedUser);
    const token = user.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 응답 인터셉터 설정
 * - 모든 Axios 요청에 대한 공통 에러 처리 설정
 * - Tanstack-Query의 OnError 콜백에서 구체적으로 처리
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      console.log(error.response.data);
    }
    return Promise.reject<ErrorResponse>(error);
  },
);

export const login = async (email: string, password: string) => {
  const res = await api.post<LoginResponse>(
    '/auth-service/auth/v1/login',
    { email, password },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.data;
};

export const logout = async (memberId: number) => {
  await api.post<void>(
    '/auth-service/auth/v1/logout',
    { memberId },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return Promise.resolve();
};

export default api;
