import { IErrorResponse } from '../interfaces/error';
import { ZodError, ZodIssue } from 'zod';

export const handleZodError = (error: ZodError): IErrorResponse => {
  const errors = error.issues.map((elem: ZodIssue) => {
    return {
      path: elem.path[elem.path?.length - 1],
      message: elem.message,
    };
  });

  return {
    statusCode: 400,
    errors,
    message: 'Validation Error',
  };
};
