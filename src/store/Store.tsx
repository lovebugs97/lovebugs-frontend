import { create } from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthState>()((set) => ({
  token: localStorage.getItem('token'),
  setToken: (token: string | null) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ token });
  },
}));

export default useAuthStore;
