import mongoose from 'mongoose';
import { IErrorResponse } from '../app/interfaces/error';

export const validationError = (
  err: mongoose.Error.ValidationError
): IErrorResponse => {
  const errors = Object.values(err.errors).map(
    (elem: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elem.path,
        message: elem.message,
      };
    }
  );

  return {
    statusCode: 400,
    errors,
    message: 'Validation Error',
  };
};
