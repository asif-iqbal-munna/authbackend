import express, { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import academicSemesters from '../modules/academicSemester/semester.routes';
import faculties from '../modules/academicFaculty/academicFaculty.routes';
import academicDepartments from '../modules/academicDepartment/academicDepartment.routes';

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/semesters', academicSemesters);
router.use('/faculties', faculties);
router.use('/academic-departments', academicDepartments);

export default router;
