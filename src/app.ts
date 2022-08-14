import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { errorResponseHandler, successResponseHandler } from './config/morgan';
import { ApiError } from './exceptions/api-error';
import { errorConverter, errorHandler } from './exceptions/error';

// routes
import { AuthRoute, ProductCategoryRoute } from 'routes';

const app: Application = express();

// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(successResponseHandler);
app.use(errorResponseHandler);

// enable cors
app.use(cors());

// routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/category', ProductCategoryRoute);

// 404 not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not Found'));
});

// convert error to ApiError
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
