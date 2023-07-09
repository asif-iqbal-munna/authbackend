import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { semesterFields, semesterTitleCodeMapper } from './semester.constants';
import { IAcademicSemester, ISemesterFilters } from './semester.interface';
import { AcademicSemester } from './semester.model';
import { IQueryOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/apiResponse';
import { paginationHelper } from '../../../helpers/paginationHelper';

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

const getSemestersService = async (
  queries: IQueryOptions,
  filters: ISemesterFilters
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const {
    page = 1,
    limit = 10,
    skip = 0,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = paginationHelper(queries);

  let matchQuery: any = { $and: [] };

  const { keyword: searchedValue = '', ...filtersData } = filters;

  if (searchedValue) {
    const searchConditions = {
      $or: semesterFields.map(item => ({
        [item]: {
          $regex: searchedValue,
          $options: 'i',
        },
      })),
    };

    matchQuery['$and'].push(searchConditions);
  }

  // if (Object.keys(filtersData)?.length > 0) {
  //   matchQuery['$and'].push({
  //     $and: Object.keys(filtersData).map(item => ({
  //       [item]: filtersData[item],
  //     })),
  //   });
  // }

  if (!searchedValue && !Object.keys(filtersData)?.length) {
    matchQuery = {};
  }

  const data = await AcademicSemester.find(matchQuery)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = AcademicSemester.findById(id);
  return result;
};

const updateSingleSemesterService = async (
  _id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // Semester title and code validation
  if (
    payload.title &&
    payload.code &&
    semesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Code is not proper for the session'
    );
  }
  const result = AcademicSemester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const SemesterService = {
  createSemesterService,
  getSemestersService,
  getSingleSemesterService,
  updateSingleSemesterService,
  deleteSingleSemesterService,
};
