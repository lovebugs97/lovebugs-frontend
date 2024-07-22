import { useMutation } from '@tanstack/react-query';
import { login } from '../services/api.ts';
import useAuthStore from '../store/Store.tsx';
import axios from 'axios';

const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await login(email, password);
    },
    onSuccess: (data) => {
      console.log(data);
      useAuthStore.getState().setToken(data.accessToken);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        console.error(`Login Failed with Status Code: ${statusCode}`);

        switch (statusCode) {
          case 401:
            alert('Unauthorized: Invalid Credentials');
            break;
        }
      }
    },
  });
};

export default useLogin;
