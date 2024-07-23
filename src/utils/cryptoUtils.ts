import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export function encryptData<T>(data: T): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
}

export function decryptData<R>(cipher: string): R {
  const bytes = CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedData) as R
}