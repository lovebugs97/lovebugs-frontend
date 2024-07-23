declare module 'auth-types' {
  type LoginRequest = {
    email: string;
    password: string;
  };

  type LoginResponse = {
    id: number;
    email: string;
    name: string;
    profileImage: string | null;
    gender: string;
    createdAt: string;
    lastLoginDate: string | null;
    accessToken: string;
  };
}
