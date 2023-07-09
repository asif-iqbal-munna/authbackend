import { Request, Response } from 'express';
import { SemesterService } from './semester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './semester.interface';
import { pick } from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { semesterFields } from './semester.constants';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await SemesterService.createSemesterService(payload);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Semester has been created successfully.',
    data: result,
  });
});

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationKeys);

  const filters = pick(req.query, ['keyword', ...semesterFields]);

  const { meta = {}, data = [] } = await SemesterService.getSemestersService(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Retrieved Semesters successfully.',
    meta,
    data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await SemesterService.getSingleSemesterService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Retrieved The Semester successfully.',
    data,
  });
});

const updateSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const data = await SemesterService.updateSingleSemesterService(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Updated The Semester successfully.',
    data,
  });
});

const deleteSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await SemesterService.deleteSingleSemesterService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Deleted The Semester successfully.',
    data,
  });
});

export const SemesterController = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSingleSemester,
  deleteSingleSemester,
};
