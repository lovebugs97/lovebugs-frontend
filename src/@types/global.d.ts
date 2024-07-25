declare module 'global-types' {
  import { LoginResponse } from 'auth-types';

  type ErrorResponse = {
    timeStamp: string;
    statusCode: number;
    error: string;
    message: string;
  };

  type User = LoginResponse;
}
