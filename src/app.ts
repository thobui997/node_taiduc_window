import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApiError } from './exceptions/apiError';
import { successResponseHandler, errorResponseHandler } from './config/morgan';
import { errorConverter, errorHandler } from './exceptions/error';

const app: Application = express();

// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(successResponseHandler);
app.use(errorResponseHandler);

// enable cors
app.use(cors());

// routes

// 404 not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not Found'));
});

// convert error to ApiError
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
