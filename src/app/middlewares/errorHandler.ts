import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IErrorResponse } from '../../interfaces/error';
import { validationError } from '../../errors/validationError';
import ApiError from '../../errors/apiError';
import { ZodError } from 'zod';
import { handleZodError } from '../../errors/handleZodError';
import { ErrorLog } from '../../shared/log';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errObj: IErrorResponse = {
    status: false,
    message: 'System Error',
    errors: [],
    stack: config.nodeEnvironment !== 'prod' ? err.stack : undefined,
  };

  let statusCode = 400;

  if (err?.name === 'ValidationError') {
    const { statusCode: code = 400, errors, message } = validationError(err);
    statusCode = code;
    errObj.errors = errors;
    errObj.message = message;
  } else if (err instanceof ZodError) {
    const { statusCode: code = 400, errors, message } = handleZodError(err);
    statusCode = code;
    errObj.errors = errors;
    errObj.message = message;
  } else if (err?.name === 'CastError') {
    errObj.statusCode = 400;
    errObj.message = 'Cast Error';
    errObj.errors = [
      {
        path: err?.path,
        message: 'Invalid Id',
      },
    ];
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errObj.message = err?.message;
    errObj.errors = err?.message ? [{ path: '', message: err.message }] : [];
  } else if (err instanceof Error) {
    errObj.message = err?.message;
    errObj.errors = err?.message ? [{ path: '', message: err.message }] : [];
  }
  ErrorLog(errObj);
  res.status(statusCode).json(errObj);
};

export default errorHandler;
