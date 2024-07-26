import {
  LoginResponse,
  LogoutRequest,
  SendVerificationCodeRequest,
  SignupRequest,
  TokenReIssueRequest,
  TokenReIssueResponse,
  VerifyCodeRequest,
} from 'auth-types';
import { getUserFromStorage, setUserToStorage } from '../../utils/cryptoUtils.ts';
import { HttpStatusCode } from 'axios';
import api from '../api.ts';

export const signup = async (signupRequest: SignupRequest) => {
  const res = await api.post<void>('/auth-service/auth/v1/signup', signupRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Created) return Promise.resolve();
  return Promise.reject();
};

export const login = async (email: string, password: string) => {
  const res = await api.post<LoginResponse>(
    '/auth-service/auth/v1/login',
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res.data);
  return Promise.reject();
};

export const logout = async ({ id, accessToken }: LogoutRequest) => {
  const res = await api.post<void>(
    '/auth-service/auth/v1/logout',
    { id, accessToken },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const emailDuplicationCheck = async (email: string) => {
  const res = await api.get<void>(`/auth-service/auth/v1/email/verification/check/${email}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const sendVerificationCode = async (sendVerificationCodeRequest: SendVerificationCodeRequest) => {
  const res = await api.post<void>('/auth-service/auth/v1/email/verification/send/code', sendVerificationCodeRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const verifyCode = async (verifyCodeRequest: VerifyCodeRequest) => {
  const res = await api.post<void>('/auth-service/auth/v1/email/verification/verify/code', verifyCodeRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const test = async () => {
  const res = await api.post<void>('/auth-service/token/v1/validation', {});
  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
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
