import 'dotenv/config';

const envVars = process.env;

export const env = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoURI: envVars.MONGO_URI,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
  expireInToken: envVars.EXPIRE_IN_TOKEN,
  expireInrRefreshToken: envVars.EXPIRE_IN_REFRESH_TOKEN,
  redisURI: envVars.REDIS_URI,
};
