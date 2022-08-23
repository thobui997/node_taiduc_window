import { ApiError } from '../exceptions/api-error';
import httpStatus from 'http-status';

const checkDuplicateName = (error: any, next: any, itemName: string) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return next(new ApiError(httpStatus.BAD_REQUEST, `${itemName} đã tồn tại`));
  }
  return next();
};

export default checkDuplicateName;
