import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import { validateRequest } from '../../middlewares/validateRequests';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

router.patch(
  '/update/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete('/delete/:id', AcademicFacultyController.deleteFaculty);

export default router;
