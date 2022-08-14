import 'dotenv/config';

interface ENV {
  [key: string]: string;
}

const envVars = process.env;

export const env: ENV = {
  nodeEnv: envVars.NODE_ENV as string,
  port: envVars.PORT as string,
  mongoURI: envVars.MONGO_URI as string,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET as string,
  expireInToken: envVars.EXPIRE_IN_TOKEN as string,
  expireInrRefreshToken: envVars.EXPIRE_IN_REFRESH_TOKEN as string,
  mongoDbName: envVars.MONGO_DB_NAME as string,
};
