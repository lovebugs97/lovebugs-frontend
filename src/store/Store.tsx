import { create } from 'zustand';
import { LoginResponse } from 'login-types';

type AuthState = {
  isError: boolean;
  setIsError: (isError: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  isError: false,
  setIsError: (isError: boolean) => {
    set({ isError });
  },

  token: localStorage.getItem('token'),
  setToken: (token: string | null) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ token });
  },

  user: null,
  setUser: (user: LoginResponse | null) => {
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
