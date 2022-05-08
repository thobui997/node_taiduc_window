import 'dotenv/config';

const envVars = process.env;

export const env = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoURI: envVars.MONGO_URI,
};
