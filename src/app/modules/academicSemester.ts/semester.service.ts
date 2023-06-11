import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { semesterTitleCodeMapper } from './semester.constants';
import { IAcademicSemester } from './semester.interface';
import { AcademicSemester } from './semester.model';

const createSemesterService = async (
  data: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  // Semester title and code validation
  if (semesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Code is not proper for the session'
    );
  }

  const createdSemester = await AcademicSemester.create(data);

  if (!createdSemester) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create semester');
  }
  return createdSemester;
};

export const SemesterService = {
  createSemesterService,
};
