export type IApiResponse<T> = {
  statusCode: number;
  status: boolean;
  message?: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  } | null;
  data?: T | null;
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};
