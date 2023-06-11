import express, { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import academicSemesters from '../modules/academicSemester.ts/semester.routes';

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/semesters', academicSemesters);

export default router;
