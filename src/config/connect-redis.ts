import { createClient } from 'redis';
import { env } from './configEnv';
import logger from './logger';

const client = createClient({
  url: env.redisURI,
});

client.on('ready', () => logger.info('Redis client ready'));
client.on('connect', () => logger.info('Redis client connected'));
client.on('error', (err) => logger.error('Redis client error: ' + err));
client.on('reconnecting', () => logger.info('Redis client is reconnecting'));

export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    logger.error('Redis connect failed: ' + error);
  }
};

export default client;
