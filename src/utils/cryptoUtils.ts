import CryptoJS from 'crypto-js';
import { LoginResponse } from 'auth-types';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export function encryptData<T>(data: T): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
}

export function decryptData<R>(cipher: string): R {
  const bytes = CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData) as R;
}

export function getUserFromStorage(): LoginResponse | null {
  const cipher = localStorage.getItem('user');
  if (cipher) return decryptData<LoginResponse>(cipher);
  else return null;
}

export function setUserToStorage(user: LoginResponse) {
  const cipher = encryptData<LoginResponse>(user);
  localStorage.setItem('user', cipher);
}
