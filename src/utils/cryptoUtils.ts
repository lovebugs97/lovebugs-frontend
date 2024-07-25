import CryptoJS from 'crypto-js';
import { User } from 'global-types';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const ENCRYPTION_USER_KEY = import.meta.env.VITE_ENCRYPTION_USER_KEY;

function encryptData<T>(data: T): string {
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(str, ENCRYPTION_KEY).toString();
}

function decryptData(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function decryptJsonData<R>(cipher: string): R {
  const str = decryptData(cipher);
  return JSON.parse(str) as R;
}

export function getUserFromStorage(): User | null {
  const cipher = localStorage.getItem(ENCRYPTION_USER_KEY);
  if (cipher) return decryptJsonData<User>(cipher);
  else return null;
}

export function setUserToStorage(user: User | null) {
  if (user === null) localStorage.removeItem(ENCRYPTION_USER_KEY);
  else {
    const cipher = encryptData(user);
    localStorage.setItem(ENCRYPTION_USER_KEY, cipher);
  }
}
