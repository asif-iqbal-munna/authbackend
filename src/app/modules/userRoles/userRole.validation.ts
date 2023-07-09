import { z } from 'zod';

const createUserRoleZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Role name is required',
    }),
    department: z.string({
      required_error: 'User department is required',
    }),
  }),
});

const updateUserRoleZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    department: z.string().optional(),
  }),
});

export const UserRoleValidation = {
  createUserRoleZodSchema,
  updateUserRoleZodSchema,
};
