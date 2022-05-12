import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import { env } from '../../../config/configEnv';
import client from '../../../config/connect-redis';
import { ApiError } from './../../../exceptions/apiError';

const verifyRefreshToken = (req: any, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  verify(refreshToken, env.refreshTokenSecret!, undefined, (err, payload: any) => {
    if (err) next(err);
    client
      .get(payload.userId)
      .then((reply) => {
        if (reply === refreshToken) {
          req.payload = payload;
          next();
        } else {
          next(new ApiError(httpStatus.UNAUTHORIZED, httpStatus['401_MESSAGE']));
        }
      })
      .catch((err) => {
        next(err);
      });
  });
};

export default verifyRefreshToken;
