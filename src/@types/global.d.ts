declare module 'global-types' {
  type ErrorResponse = {
    timeStamp: string;
    statusCode: number;
    error: string;
    message: string;
  };
}
