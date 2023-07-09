import express from 'express';
import { validateRequest } from '../../middlewares/validateRequests';
import { UserRoleValidation } from './userRole.validation';
import { UserRoleController } from './userRole.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserRoleValidation.createUserRoleZodSchema),
  UserRoleController.createUserRole
);

router.get('/:id', UserRoleController.getSingleUserRole);

router.get('/', UserRoleController.getAllUserRoles);

router.patch(
  '/update/:id',
  validateRequest(UserRoleValidation.updateUserRoleZodSchema),
  UserRoleController.updateUserRole
);

router.delete('/delete/:id', UserRoleController.deleteUserRole);

export default router;
