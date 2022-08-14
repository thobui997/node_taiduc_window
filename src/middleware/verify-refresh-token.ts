import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import { env } from '../config/config-env';
import { ApiError } from '../exceptions/api-error';

const verifyRefreshToken = (req: any, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  verify(refreshToken, env.refreshTokenSecret, undefined, (err, payload: any) => {
    if (err) next(err);
    return next(new ApiError(httpStatus.UNAUTHORIZED, httpStatus['401_MESSAGE']));
    // client
    //   .get(payload.userId)
    //   .then((reply) => {
    //     if (reply === refreshToken) {
    //       req.payload = payload;
    //       next();
    //     } else {
    //     }
    //   })
    //   .catch((err) => {
    //     next(err);
    //   });
  });
};

export default verifyRefreshToken;
