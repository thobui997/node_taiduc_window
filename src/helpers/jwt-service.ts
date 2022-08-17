import { sign } from 'jsonwebtoken';
import { env } from '../config/config-env';

const signAccessToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    sign(payload, env.accessTokenSecret, { expiresIn: env.expireInToken }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

const signRefreshToken = (userId: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    sign(payload, env.refreshTokenSecret, { expiresIn: env.expireInrRefreshToken }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

export { signAccessToken, signRefreshToken };
