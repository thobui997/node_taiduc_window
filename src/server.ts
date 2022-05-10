import { connectDB } from './config/db';
import { env } from './config/configEnv';
import app from './app';
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
