import { createClient } from 'redis';
import logger from './logger';
import { env } from './configEnv';

const client = createClient({
  url: env.redisURI,
});

client.on('error', (err) => logger.error('Redis Client Error: ' + err));
client.on('connect', () => logger.info('Redis Client connected'));
client.on('ready', () => logger.info('Redis Client ready'));

export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    logger.error('Redis connect failed: ' + error);
  }
};

export default client;
