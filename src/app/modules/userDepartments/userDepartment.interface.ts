import { Model, Types } from 'mongoose';
import { IUserRole } from '../userRoles/userRole.interface';

export type IUserDepartment = {
  title: string;
  roles: [Types.ObjectId | IUserRole];
};

export type UserDepartmentModel = Model<
  IUserDepartment,
  Record<string, unknown>
>;

export type IUserDepartmentFilters = {
  searchTerm?: string;
  role?: Types.ObjectId;
};
