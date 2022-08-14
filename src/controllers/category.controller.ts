import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ResponseStatus } from '../enums/response-status';
import { asyncHandler } from '../helpers/async';
import ProductCategory from '../models/category.model';
import { PaginateOptions } from '../constants/paginate-options';
import { ApiError } from '../exceptions/api-error';

const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  await ProductCategory.create({ name });

  return res.status(httpStatus.OK).json({
    status: ResponseStatus.SUCCESS,
  });
});

const updateById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await ProductCategory.updateOne({ _id: id }, { name });
  if (!category) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  return res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS });
});

const getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { size = PaginateOptions.SIZE, page = PaginateOptions.PAGE } = req.query;

  const categories = await ProductCategory.find()
    .select('name createdAt updatedAt')
    .limit(+size)
    .skip((+page - 1) * +size)
    .exec();

  const totalItems = await ProductCategory.count();

  return res.status(httpStatus.OK).json({
    status: ResponseStatus.SUCCESS,
    categories,
    totalItems,
    currentPage: +page,
    totalPages: Math.ceil(totalItems / +size),
  });
});

const getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // find category in db
  const category = await ProductCategory.findById(id).select('name createdAt updatedAt');
  if (!category) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  return res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS, category });
});

const deleteById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // find category in db
  const category = await ProductCategory.findByIdAndDelete(id);
  if (!category) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  return res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS });
});

export const productCategory = {
  create,
  updateById,
  getCategories,
  getCategoryById,
  deleteById,
};
