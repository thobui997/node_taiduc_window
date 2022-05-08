import { Response } from 'express';
import morgan from 'morgan';
import logger from './logger';
import { env } from './configEnv';

morgan.token('message', (req, res: Response) => {
  return res.locals.errorMessage || '';
});

const getIpFormat = () => {
  return env.nodeEnv === 'production' ? ':remote-addr - ' : '';
};

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successResponseHandler = morgan(successResponseFormat, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: {
    write: (message) => {
      return logger.info(message.trim());
    },
  },
});

export const errorResponseHandler = morgan(errorResponseFormat, {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: {
    write: (message) => {
      return logger.error(message.trim());
    },
  },
});
