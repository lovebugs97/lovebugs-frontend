import { create } from 'zustand';
import { getUserFromStorage, setUserToStorage } from '../utils/cryptoUtils.ts';
import { User } from 'global-types';

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: getUserFromStorage(),

  setUser: (user: User | null) => {
    if (user) setUserToStorage(user);
    else setUserToStorage(null);
    set({ user });
  },
}));
