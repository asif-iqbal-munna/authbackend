import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await UserService.createUserService(payload);
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'User has been created successfully.',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
