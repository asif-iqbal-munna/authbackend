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
router.get('/', SemesterController.getSemesters);

router.patch(
  '/update/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidation),
  SemesterController.updateSingleSemester
);

router.get('/:id', SemesterController.getSingleSemester);
router.delete('/delete/:id', SemesterController.deleteSingleSemester);

export default router;
