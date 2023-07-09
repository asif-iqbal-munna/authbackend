import { IMonth, ISemesterCode, ISemesterTitle } from './semester.interface';

export const semesterNames: ISemesterTitle[] = ['autumn', 'summer', 'fall'];
export const semesterCodes: ISemesterCode[] = ['01', '02', '03'];
export const semesterMonths: IMonth[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const semesterTitleCodeMapper: {
  [key: string]: string;
} = {
  autumn: '01',
  summer: '02',
  fall: '03',
};

export const semesterFields = ['title', 'code', 'year'];
