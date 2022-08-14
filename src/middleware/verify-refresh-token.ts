import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../config/config-env';
import RefreshToKen from '../models/refresh-token.model';

const verifyRefreshToken = (req: any, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  verify(refreshToken, env.refreshTokenSecret, undefined, async (err, payload: any) => {
    if (err) return next(err);
    const reply = await RefreshToKen.findOne({ userId: payload.userId });
    if (reply?.token === refreshToken) {
      req.payload = payload;
      return next();
    }
  });
};

export default verifyRefreshToken;
