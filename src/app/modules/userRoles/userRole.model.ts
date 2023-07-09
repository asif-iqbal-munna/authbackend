import { Schema, model } from 'mongoose';
import { IUserRole, UserRoleModel } from './userRole.interface';

const UserRolesSchema = new Schema<IUserRole, UserRoleModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'UserDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserRole = model<IUserRole, UserRoleModel>(
  'UserRole',
  UserRolesSchema
);
