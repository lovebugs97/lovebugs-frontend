import { useMutation } from '@tanstack/react-query';
import { uploadProfileImage } from '../../../services/auth/authService.ts';
import { ErrorResponse, User } from 'global-types';
import { useAuthStore } from '../../../store/authStore.ts';

const useUserProfile = () => {
  const { setUser } = useAuthStore((state) => state);

  const uploadProfileImageMutation = useMutation<User, ErrorResponse, FormData>({
    mutationFn: async (formData) => await uploadProfileImage(formData),
    onSuccess: (user) => {
      console.log(user);
      setUser(user);
    },
    onError: (error) => {
      console.log(error);
      setUser(null);
    },
  });

  return {
    uploadProfileImageMutation,
  };
};

export default useUserProfile;
