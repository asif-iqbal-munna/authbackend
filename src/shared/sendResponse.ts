import { Response } from 'express';
import { IApiResponse } from '../app/interfaces/apiResponse';

const sendResponse = <T>(res: Response, resData: IApiResponse<T>): void => {
  const { statusCode, status, message = null, data = null } = resData;
  const resObj: IApiResponse<T> = {
    statusCode,
    status,
    message,
    data,
  };

  res.status(statusCode).json(resObj);
};

export default sendResponse;
