import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { TokenReIssueRequest, TokenReIssueResponse } from 'auth-types';
import { getUserFromStorage, setUserToStorage } from '../utils/cryptoUtils.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
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
    console.log(user);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === HttpStatusCode.Unauthorized && user && !originalRequest._retry) {
      originalRequest._retry = true;

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

        // Refresh Token도 만료되었을 때
        if (refreshResponse.status === 401) {
          // TODO: 재로그인 로직 추가
          alert('로그인 세션이 만료되었습니다.');
          window.location.href = '/';
        }
      } catch (refreshError) {
        console.error('Refresh token request failed:', refreshError);
        alert('로그인 세션이 만료되었습니다.');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
