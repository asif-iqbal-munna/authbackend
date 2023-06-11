import { NextFunction, Request, Response } from 'express';
import { SemesterService } from './semester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await SemesterService.createSemesterService(payload);
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Semester has been created successfully.',
      data: result,
    });
  }
);

export const SemesterController = {
  createSemester,
};
