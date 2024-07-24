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
    refreshToken: string;
  };

  type LogoutRequest = {
    id: number;
    accessToken: string;
  };

  type TokenReIssueRequest = {
    id: number;
    email: string;
    refreshToken: string;
  };

  type TokenReIssueResponse = {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
}
