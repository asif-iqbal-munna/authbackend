export type IErrorResponse = {
  status?: boolean;
  message: string;
  errors: {
    path: string | number;
    message: string;
  }[];
  stack?: unknown;
  statusCode?: number;
};
