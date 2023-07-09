import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pick } from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { IUserRole } from './userRole.interface';
import { userRoleFilterableFields } from './userRole.constants';
import { UserRoleService } from './userRole.service';

const createUserRole = catchAsync(async (req: Request, res: Response) => {
  const { ...userRoleData } = req.body;
  const result = await UserRoleService.createUserRoleService(userRoleData);

  sendResponse<IUserRole>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role created successfully',
    data: result,
  });
});

const getSingleUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserRoleService.getSingleUserRoleService(id);

  sendResponse<IUserRole>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role fetched successfully',
    data: result,
  });
});

const getAllUserRoles = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userRoleFilterableFields);
  const paginationOptions = pick(req.query, paginationKeys);

  const result = await UserRoleService.getAllUserRolesService(
    filters,
    paginationOptions
  );

  sendResponse<IUserRole[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User roles fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserRoleService.updateUserRoleService(id, req.body);

  sendResponse<IUserRole>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role updated successfully',
    data: result,
  });
});

const deleteUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserRoleService.deleteUserRoleService(id);

  sendResponse<IUserRole>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User role deleted successfully',
    data: result,
  });
});

export const UserRoleController = {
  createUserRole,
  getSingleUserRole,
  getAllUserRoles,
  updateUserRole,
  deleteUserRole,
};
