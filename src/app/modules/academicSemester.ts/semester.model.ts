import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './semester.interface';
import {
  semesterCodes,
  semesterMonths,
  semesterNames,
} from './semester.constants';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: semesterNames },
    code: { type: String, required: true, enum: semesterCodes },
    year: { type: Number, required: true },
    startMonth: { type: String, required: true, enum: semesterMonths },
    endMonth: { type: String, required: true, enum: semesterMonths },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  // Validation to prevent creating data with same title in a particular year
  const isDuplicate = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isDuplicate) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Same session already exist in ${this.year}`
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
