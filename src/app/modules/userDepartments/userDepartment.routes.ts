import express from 'express';
import { validateRequest } from '../../middlewares/validateRequests';
import { UserDepartmentValidation } from './userDepartment.validation';
import { UserDepartmentController } from './userDepartment.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserDepartmentValidation.createUserRoleZodSchema),
  UserDepartmentController.createUserDepartment
);

router.get('/:id', UserDepartmentController.getSingleUserDepartment);

router.get('/', UserDepartmentController.getAllUserDepartments);

router.patch(
  '/update/:id',
  validateRequest(UserDepartmentValidation.updateUserRoleZodSchema),
  UserDepartmentController.updateUserDepartment
);

router.delete('/delete/:id', UserDepartmentController.deleteUserDepartment);

export default router;
