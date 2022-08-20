import { ResponseStatus } from './../enums/response-status';

export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

const responseBody = (status: ResponseStatus, data?: any, pagination?: Pagination) => {
  return {
    status,
    ...pagination,
    ...(data && { data }),
  };
};

export default responseBody;
