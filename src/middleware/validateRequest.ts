import { ApiError } from '../exceptions/apiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export const validateRequest = (validator: Joi.ObjectSchema) => {
  if (!validator) {
    throw new Error(`'${validator}' validator is not exist`);
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await validator.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      if (error.isJoi) {
        return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message));
      }
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
    }
  };
};
