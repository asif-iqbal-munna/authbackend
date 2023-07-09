import { Schema, model } from 'mongoose';
import {
  IUserDepartment,
  UserDepartmentModel,
} from './userDepartment.interface';
import { UserRoleModel } from '../userRoles/userRole.interface';

const UserDepartmentSchema = new Schema<IUserDepartment, UserRoleModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserDepartment = model<IUserDepartment, UserDepartmentModel>(
  'UserDepartment',
  UserDepartmentSchema
);
