import { ResponseStatus } from './../enums/response-status';

const responseBody = (status: ResponseStatus, data?: any) => {
  return {
    status,
    ...(data && { data }),
  };
};

export default responseBody;
