import { LoginResponse, LogoutRequest, TokenReIssueRequest, TokenReIssueResponse } from 'auth-types';
import { getUserFromStorage, setUserToStorage } from '../../utils/cryptoUtils.ts';
import { HttpStatusCode } from 'axios';
import api from '../api.ts';

export const login = async (email: string, password: string) => {
  const res = await api.post<LoginResponse>(
    '/auth-service/auth/v1/login',
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return res.data;
};

export const logout = async ({ id, accessToken }: LogoutRequest) => {
  await api.post<void>(
    '/auth-service/auth/v1/logout',
    { id, accessToken },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return Promise.resolve();
};

export const test = async () => {
  await api.post<void>('/auth-service/token/v1/validation', {});

  return Promise.resolve();
};

export const test2 = async () => {
  const user = getUserFromStorage();

  if (user === null) {
    return;
  }

  const res = await api.post<TokenReIssueResponse>('/auth-service/token/v1/reissue', {
    id: user.id,
    email: user.email,
    refreshToken: user.refreshToken,
  } as TokenReIssueRequest);

  if (res.status === HttpStatusCode.Ok) {
    const formattedUser = {
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };

    setUserToStorage(formattedUser);
  }

  console.log(res.data);
};
