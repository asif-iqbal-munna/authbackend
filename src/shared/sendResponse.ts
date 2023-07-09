import { Response } from 'express';
import { IApiResponse } from '../interfaces/apiResponse';

const sendResponse = <T>(res: Response, resData: IApiResponse<T>): void => {
  const {
    statusCode,
    status,
    message = null,
    data = null,
    meta = null,
  } = resData;
  const resObj: IApiResponse<T> = {
    statusCode,
    status,
    message,
    meta,
    data,
  };

  res.status(statusCode).json(resObj);
};

export default sendResponse;
