import { create } from 'zustand';
import { LoginResponse } from 'auth-types';
import { encryptData } from '../utils/cryptoUtils.ts';

type AuthState = {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  setUser: (user: LoginResponse | null) => {
    if (user) localStorage.setItem('user', encryptData<LoginResponse>(user));
    else localStorage.removeItem('user');
    set({ user });
  },
}));

type LoginModalState = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const useLoginModal = create<LoginModalState>()((set) => ({
  modalOpen: false,
  setModalOpen: (open: boolean) => {
    set({ modalOpen: open });
  },
}));
