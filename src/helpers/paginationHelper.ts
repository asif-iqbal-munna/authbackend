import { IQueryOptions } from '../interfaces/pagination';

type IPgReturnOption = IQueryOptions & {
  skip?: number;
};

export const paginationHelper = ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: IQueryOptions): IPgReturnOption => {
  const skip = limit * (page - 1);
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
