import { Model } from 'mongoose';

export type IMonth =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

export type ISemesterTitle = 'fall' | 'autumn' | 'summer';
export type ISemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: ISemesterTitle;
  year: number;
  code: ISemesterCode;
  startMonth: IMonth;
  endMonth: IMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
