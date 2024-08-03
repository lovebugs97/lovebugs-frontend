import {
  FindUsersResponse,
  LoginResponse,
  LogoutRequest,
  Page,
  SendVerificationCodeRequest,
  SignupRequest,
  VerifyCodeRequest,
} from 'auth-types';
import { HttpStatusCode } from 'axios';
import api from '../api.ts';

export const signup = async (signupRequest: SignupRequest) => {
  const res = await api.post<void>('/auth-service/auth/signup', signupRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Created) return Promise.resolve();
  return Promise.reject();
};

export const login = async (email: string, password: string) => {
  const res = await api.post<LoginResponse>(
    '/auth-service/auth/login',
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
    '/auth-service/auth/logout',
    { id, accessToken },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const emailDuplicationCheck = async (email: string) => {
  const res = await api.get<void>(`/auth-service/auth/email/verification/check/${email}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const sendVerificationCode = async (sendVerificationCodeRequest: SendVerificationCodeRequest) => {
  const res = await api.post<void>('/auth-service/auth/email/verification/send/code', sendVerificationCodeRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const verifyCode = async (verifyCodeRequest: VerifyCodeRequest) => {
  const res = await api.post<void>('/auth-service/auth/email/verification/verify/code', verifyCodeRequest, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve();
  return Promise.reject();
};

export const findUsers = async (page: number, size: number) => {
  const res = await api.get<Page<FindUsersResponse>>(`/auth-service/admin/member/list?page=${page}&size=${size}`);

  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res.data);
  return Promise.reject();
};

export const uploadProfileImage = async (formData: FormData) => {
  const res = await api.post('/auth-service/member/upload/profile/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res.data);
  return Promise.reject();
};
