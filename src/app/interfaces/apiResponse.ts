export type IApiResponse<T> = {
  statusCode: number;
  status: boolean;
  message?: string | null;
  data?: T | null;
};
