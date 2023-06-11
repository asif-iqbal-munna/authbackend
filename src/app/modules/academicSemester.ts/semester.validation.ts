import { z } from 'zod';
import {
  semesterCodes,
  semesterMonths,
  semesterNames,
} from './semester.constants';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    title: z.enum([...semesterNames] as [string, ...string[]], {
      required_error: 'title is required',
    }),

    year: z.number({
      required_error: 'year is required',
    }),

    code: z.enum([...semesterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),

    startMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),

    endMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
};
