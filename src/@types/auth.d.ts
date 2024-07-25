declare module 'auth-types' {
  type RoleType = 'ROLE_USER' | 'ROLE_IMPORTANT' | 'ROLE_VIP' | 'ROLE_ADMIN';

  type SignupRequest = {
    name: string;
    email: string;
    password: string;
    gender: number;
  };

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
    role: RoleType;
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
