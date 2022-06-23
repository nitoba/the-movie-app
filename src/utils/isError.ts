export const isError = (error: any): error is Error =>
  error?.message !== undefined;
