import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { TokenReIssueRequest, TokenReIssueResponse } from 'auth-types';
import { getUserFromStorage, setUserToStorage } from '../utils/cryptoUtils.ts';
import { logout } from './auth/authService.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const user = getUserFromStorage();
    if (user) {
      const token = user.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* 응답 인터셉터 설정
 * - 모든 Axios 요청에 대한 공통 에러 처리 설정
 * - Tanstack-Query의 OnError 콜백에서 구체적으로 처리
 */
// 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const user = getUserFromStorage();

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === HttpStatusCode.Unauthorized && user && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('interceptors response executed');

      try {
        const refreshResponse = await api.post<TokenReIssueResponse>(
          '/auth-service/token/v1/reissue',
          { id: user.id, email: user.email, refreshToken: user.refreshToken } as TokenReIssueRequest,
          { headers: { 'Content-Type': 'application/json' } },
        );

        if (refreshResponse.status === HttpStatusCode.Ok) {
          const formattedUser = {
            ...user,
            accessToken: refreshResponse.data.accessToken,
            refreshToken: refreshResponse.data.refreshToken,
          };

          setUserToStorage(formattedUser);
          api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;

          return api(originalRequest);
        }

        return Promise.reject();
      } catch (refreshError) {
        logout({ id: user.id, accessToken: user.accessToken })
          .catch(() => console.log('Logout Failed'))
          .finally(() => {
            console.log('logout finally');
            setUserToStorage(null);
            alert('로그인 세션이 만료되었습니다.');
            window.location.reload();
          });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
