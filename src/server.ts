import app from './app';
import { env } from './config/config-env';
import connectDB from './config/db';
import logger from './config/logger';

// connect database
connectDB();

try {
  app.listen(env.port || 5000, () => {
    logger.info(`Application listening on port ${env.port}`);
  });
} catch (error) {
  logger.error(`Application crashed: ${error}`);
}
