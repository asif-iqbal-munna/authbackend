import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IQueryOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/apiResponse';
import {
  IUserDepartment,
  IUserDepartmentFilters,
} from './userDepartment.interface';
import { UserDepartment } from './userDepartment.model';
import { userDepartmentSearchableFields } from './userDepartment.constants';

const createUserDepartmentService = async (payload: IUserDepartment) => {
  const result = (await UserDepartment.create(payload)).populate('roles');
  return result;
};

const getSingleUserDepartmentService = async (
  id: string
): Promise<IUserDepartment | null> => {
  const result = await UserDepartment.findById(id).populate('roles');
  return result;
};

const getAllUserDepartmentsService = async (
  filters: IUserDepartmentFilters,
  paginationOptions: IQueryOptions
): Promise<IGenericResponse<IUserDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const {
    page = 1,
    limit = 10,
    skip = 0,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = paginationHelper(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await UserDepartment.find(whereConditions)
    .populate('roles')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await UserDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUserDepartmentService = async (
  id: string,
  payload: Partial<IUserDepartment>
): Promise<IUserDepartment | null> => {
  const result = await UserDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('roles');
  return result;
};

const deleteUserDepartmentService = async (
  id: string
): Promise<IUserDepartment | null> => {
  const result = await UserDepartment.findByIdAndDelete(id);
  return result;
};

export const UserDepartmentService = {
  createUserDepartmentService,
  getAllUserDepartmentsService,
  getSingleUserDepartmentService,
  updateUserDepartmentService,
  deleteUserDepartmentService,
};
