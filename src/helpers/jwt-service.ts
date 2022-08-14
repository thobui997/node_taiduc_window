import logger from '../config/logger';
import { sign } from 'jsonwebtoken';
import RefreshToKen from '../models/refresh-token.model';
import { env } from '../config/config-env';

const signAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    sign(payload, env.accessTokenSecret, { expiresIn: env.expireInToken }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const signRefreshToken = (userId: any) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    sign(payload, env.refreshTokenSecret, { expiresIn: env.expireInrRefreshToken }, async (err, token) => {
      if (err) return reject(err);
      try {
        const refreshToken = new RefreshToKen({ userId, token });
        await refreshToken.save();
        resolve(token);
      } catch (error) {
        logger.error(error);
      }
    });
  });
};

export { signAccessToken, signRefreshToken };
