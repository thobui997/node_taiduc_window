import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { env } from './../config/configEnv';
import { ApiError } from './apiError';
import logger from '../config/logger';
import { ResponseStatus } from './../api/v1/enums/responseStatus';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  // if (env.nodeEnv === 'production' && !err.isOperational) {
  //   statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  //   message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  // }

  res.locals.errorMessage = message;

  const response = {
    status: ResponseStatus.ERROR,
    message,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  };

  if (env.nodeEnv === 'development') {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};

export { errorConverter, errorHandler };
