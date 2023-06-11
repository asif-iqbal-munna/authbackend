/* eslint-disable no-console */
import config from '../config';
import { loggerError, loggerSuccess } from './logger';
export const ErrorLog = (err: unknown) => {
  if (config.nodeEnvironment === 'dev') {
    console.log(err);
  } else {
    loggerError.error(err);
  }
};
export const SuccessLog = (err: unknown) => {
  if (config.nodeEnvironment === 'dev') {
    console.log(err);
  } else {
    loggerSuccess.info(err);
  }
};
