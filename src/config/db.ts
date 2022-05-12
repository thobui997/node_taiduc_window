import { env } from './configEnv';
import mongoose from 'mongoose';
import logger from './logger';

mongoose.connection.on('error', (err) => {
  logger.error(err);
});

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoURI!, {
      autoIndex: false,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    logger.info('Connect to database is successfully');
  } catch (error) {
    logger.error(`Connect to database is failed: ${error}`);
  }
};
export default connectDB;
