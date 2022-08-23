import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginateOptions } from '../constants/paginate-options';
import { ResponseStatus } from '../enums/response-status';
import { ApiError } from '../exceptions/api-error';
import { asyncHandler, responseBody } from '../helpers';
import { ProductCategory } from '../models';

const SUCCESS = ResponseStatus.SUCCESS;

/**
 * @desc create a new category
 * @route private /ap1/v1/category
 */
const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  await ProductCategory.create({ name });

  return res.status(httpStatus.OK).json(responseBody(SUCCESS));
});

/**
 * @desc update a category
 * @route private /ap1/v1/category/:id
 */
const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await ProductCategory.updateOne({ _id: id }, { name }).exec();
  if (!category) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  return res.status(httpStatus.OK).json(responseBody(SUCCESS));
});

/**
 * @desc get list all categories
 * @route public /ap1/v1/category
 */
const getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { size = PaginateOptions.SIZE, page = PaginateOptions.PAGE } = req.query;

  const categories = await ProductCategory.find()
    .select('name createdAt updatedAt')
    .limit(+size)
    .skip((+page - 1) * +size)
    .exec();

  const totalItems = await ProductCategory.count().exec();

  const pagination = { totalItems, currentPage: +page, totalPages: Math.ceil(totalItems / +size) };

  return res.status(httpStatus.OK).json(responseBody(SUCCESS, categories, pagination));
});

/**
 * @desc get a category
 * @route public /ap1/v1/category/:id
 */
const getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const category = await ProductCategory.findById(id).select('name createdAt updatedAt').exec();
  if (!category) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  return res.status(httpStatus.OK).json(responseBody(SUCCESS, category));
});

/**
 * @desc delete a category
 * @route private /ap1/v1/category/:id
 */
const deleteById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const foundCategory = await ProductCategory.findById(id).exec();
  if (!foundCategory) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  await foundCategory.deleteOne();

  return res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS });
});

export const productCategory = {
  create,
  update,
  getCategories,
  getCategoryById,
  deleteById,
};
