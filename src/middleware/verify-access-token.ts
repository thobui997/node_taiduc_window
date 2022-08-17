import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import { env } from '../config/config-env';
import { ApiError } from '../exceptions/api-error';

const verifyAccessToken = (req: Request | any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access'));
  }
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  // verify token
  verify(token, env.accessTokenSecret, undefined, (err, payload) => {
    if (!err) {
      req.payLoad = payload;
      return next();
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access'));
    }
    return next(new ApiError(httpStatus.UNAUTHORIZED, err.message));
  });
};

export default verifyAccessToken;
