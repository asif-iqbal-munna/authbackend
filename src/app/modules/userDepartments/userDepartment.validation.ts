import { z } from 'zod';

const createUserRoleZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Role name is required',
    }),
    roles: z.string().array().optional(),
  }),
});

const updateUserRoleZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    roles: z.string().array().optional(),
  }),
});

export const UserDepartmentValidation = {
  createUserRoleZodSchema,
  updateUserRoleZodSchema,
};
