import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IQueryOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/apiResponse';
import { IUserRole, IUserRoleFilters } from './userRole.interface';
import { UserRole } from './userRole.model';
import { userRoleSearchableFields } from './userRole.constants';
import { UserDepartment } from '../userDepartments/userDepartment.model';

const createUserRoleService = async (payload: IUserRole) => {
  const result = await (await UserRole.create(payload)).populate('department');
  if (result._id) {
    const { department } = payload;
    const updateDepartment = await UserDepartment.findOneAndUpdate(
      { _id: department },
      { $push: { roles: result._id } }
    );
    if (updateDepartment) {
      return result;
    }
  }
};

const getSingleUserRoleService = async (
  id: string
): Promise<IUserRole | null> => {
  const result = await UserRole.findById(id).populate('department');
  return result;
};

const getAllUserRolesService = async (
  filters: IUserRoleFilters,
  paginationOptions: IQueryOptions
): Promise<IGenericResponse<IUserRole[]>> => {
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
      $or: userRoleSearchableFields.map(field => ({
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

  const result = await UserRole.find(whereConditions)
    .populate('department')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await UserRole.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUserRoleService = async (
  id: string,
  payload: Partial<IUserRole>
): Promise<IUserRole | null> => {
  const result = await UserRole.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('department');
  return result;
};

const deleteUserRoleService = async (id: string): Promise<IUserRole | null> => {
  const result = await UserRole.findByIdAndDelete(id);
  return result;
};

export const UserRoleService = {
  createUserRoleService,
  getAllUserRolesService,
  getSingleUserRoleService,
  updateUserRoleService,
  deleteUserRoleService,
};
