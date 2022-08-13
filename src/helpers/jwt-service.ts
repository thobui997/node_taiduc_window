import { sign } from 'jsonwebtoken';
import { env } from '../config/configEnv';
import client from '../config/connect-redis';

const signAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    sign(payload, env.accessTokenSecret!, { expiresIn: env.expireInToken! }, (err, token) => {
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

    sign(
      payload,
      env.refreshTokenSecret!,
      { expiresIn: env.expireInrRefreshToken! },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        client
          .set(userId.toString(), token!, { EX: 365 * 24 * 60 * 60 })
          .then(() => resolve(token))
          .catch((err) => reject(err));
      }
    );
  });
};

export { signAccessToken, signRefreshToken };
