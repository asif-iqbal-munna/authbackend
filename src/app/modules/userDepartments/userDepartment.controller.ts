import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pick } from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { UserDepartmentService } from './userDepartment.service';
import { IUserDepartment } from './userDepartment.interface';
import { userDepartmentFilterableFields } from './userDepartment.constants';

const createUserDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...UserDepartmentData } = req.body;
  const result = await UserDepartmentService.createUserDepartmentService(
    UserDepartmentData
  );

  sendResponse<IUserDepartment>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role created successfully',
    data: result,
  });
});

const getSingleUserDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserDepartmentService.getSingleUserDepartmentService(
      id
    );

    sendResponse<IUserDepartment>(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'User role fetched successfully',
      data: result,
    });
  }
);

const getAllUserDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationKeys);

    const result = await UserDepartmentService.getAllUserDepartmentsService(
      filters,
      paginationOptions
    );

    sendResponse<IUserDepartment[]>(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'User roles fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateUserDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserDepartmentService.updateUserDepartmentService(
    id,
    req.body
  );

  sendResponse<IUserDepartment>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role updated successfully',
    data: result,
  });
});

const deleteUserDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserDepartmentService.deleteUserDepartmentService(id);

  sendResponse<IUserDepartment>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role deleted successfully',
    data: result,
  });
});

export const UserDepartmentController = {
  createUserDepartment,
  getSingleUserDepartment,
  getAllUserDepartments,
  updateUserDepartment,
  deleteUserDepartment,
};
