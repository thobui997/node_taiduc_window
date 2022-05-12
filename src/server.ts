import app from './app';
import { env } from './config/configEnv';
import { connectRedis } from './config/connect-redis';
import connectDB from './config/db';
import logger from './config/logger';

// connect database
connectDB();

// connect redis
connectRedis();

try {
  app.listen(env.port || 5000, () => {
    logger.info(`Application listening on port ${env.port}`);
  });
} catch (error) {
  logger.error(`Application crashed: ${error}`);
}
