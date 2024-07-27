import api from '../api.ts';
import { HttpStatusCode } from 'axios';

export const adminTest = async () => {
  const res = await api.get('/admin-service/admin/v1/test');
  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res.data);
  return Promise.reject();
};
