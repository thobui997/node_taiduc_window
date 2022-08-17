import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { errorResponseHandler, successResponseHandler } from './config/morgan';
import { docs } from './docs';
import { ApiError } from './exceptions/api-error';
import { errorConverter, errorHandler } from './exceptions/error';

// import routes
import { AuthRoute, ProductCategoryRoute } from './routes';

const app: Application = express();

// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(successResponseHandler);
app.use(errorResponseHandler);
app.use('/api-docs', serve, setup(docs));

// enable cors
app.use(cors());

// setup cookie
app.use(cookieParser());

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
