import { Model, Types } from 'mongoose';
import { IUserDepartment } from '../userDepartments/userDepartment.interface';

export type IUserRole = {
  title: string;
  department: Types.ObjectId | IUserDepartment;
};

export type UserRoleModel = Model<IUserRole, Record<string, unknown>>;

export type IUserRoleFilters = {
  searchTerm?: string;
  department?: Types.ObjectId;
};
