import { env } from './../../../config/configEnv';
import { sign } from 'jsonwebtoken';

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

export { signAccessToken };
