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

const updateAcademicSemesterValidation = z
  .object({
    body: z.object({
      title: z
        .enum([...semesterNames] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),

      year: z
        .number({
          required_error: 'year is required',
        })
        .optional(),

      code: z
        .enum([...semesterCodes] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),

      startMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),

      endMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body?.title && data.body?.code) ||
      (!data.body?.title && !data.body?.code),
    {
      message: 'Both title and code should be present not not',
    }
  );
export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
