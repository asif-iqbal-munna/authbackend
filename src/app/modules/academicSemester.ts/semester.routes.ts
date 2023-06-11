import express from 'express';
import { validateRequest } from '../../middlewares/validateRequests';
import { AcademicSemesterValidation } from './semester.validation';
import { SemesterController } from './semester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
  SemesterController.createSemester
);

export default router;
