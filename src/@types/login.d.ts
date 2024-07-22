declare module 'login-types' {
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
    lastLoginDate: string;
    accessToken: string;
  };

  type LoginError = {
    timeStamp: string;
    statusCode: number;
    error: string;
    message: string;
  };
}
