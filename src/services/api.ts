import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { TokenReIssueRequest, TokenReIssueResponse } from 'auth-types';
import { logout } from './auth/authService.ts';
import { useAuthStore } from '../store/authStore.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const user = useAuthStore.getState().user;
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
type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { user, setUser } = useAuthStore.getState();

    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === HttpStatusCode.Unauthorized && originalRequest && user && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('interceptors response executed');

      try {
        const res = await api.post<TokenReIssueResponse>(
          '/auth-service/token/reissue',
          { id: user.id, email: user.email, refreshToken: user.refreshToken } as TokenReIssueRequest,
          { headers: { 'Content-Type': 'application/json' } },
        );

        if (res.status === HttpStatusCode.Ok) {
          const refreshedUser = {
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };

          setUser(refreshedUser);
          originalRequest.headers.Authorization = `Bearer ${user.accessToken}`;

          return api(originalRequest);
        }
      } catch (error) {
        logout({ id: user.id, accessToken: user.accessToken })
          .catch(() => console.log('Logout Failed'))
          .finally(() => {
            setUser(null);
            alert('로그인 세션이 만료되었습니다.');
          });

        return Promise.reject(error);
      }
    }
  },
);

export default api;
