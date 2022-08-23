import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ResponseStatus } from '../enums/response-status';
import { asyncHandler, responseBody } from '../helpers';
import { Product } from '../models';
import { PaginateOptions } from './../constants/paginate-options';
import { ApiError } from './../exceptions/api-error';

const SUCCESS = ResponseStatus.SUCCESS;

/**
 * @desc create a new product
 * @route private /ap1/v1/product
 */
const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, imageUrl, categoryId, productInfo } = req.body;

  const newProduct = new Product({ title, description, imageUrl, category: categoryId, productInfo });
  await newProduct.save();

  return res.status(httpStatus.OK).json(responseBody(SUCCESS));
});

/**
 * @desc update a product
 * @route private /ap1/v1/product/:id
 */
const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, imageUrl, categoryId, productInfo } = req.body;

  const foundProduct = await Product.findById(id).exec();
  if (!foundProduct) return next(new ApiError(httpStatus.BAD_REQUEST, 'sản phẩm không tồn tại'));
  // update product in db
  foundProduct.title = title;
  foundProduct.description = description;
  foundProduct.imageUrl = imageUrl;
  foundProduct.category = new mongoose.Types.ObjectId(categoryId);
  foundProduct.productInfo = productInfo;
  await foundProduct.save();

  return res.status(httpStatus.OK).json(responseBody(SUCCESS));
});

/**
 * @desc get list all products
 * @route public /ap1/v1/product
 */
const getProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { size = PaginateOptions.SIZE, page = PaginateOptions.PAGE } = req.query;

  const products = await Product.find()
    .select('title description imageUrl productInfo createdAt updatedAt')
    .limit(+size)
    .skip((+page - 1) * +size)
    .exec();

  const totalItems = await Product.count().exec();

  const pagination = { totalItems, currentPage: +page, totalPages: Math.ceil(totalItems / +size) };

  return res.status(httpStatus.OK).json(responseBody(SUCCESS, products, pagination));
});

/**
 * @desc get a product by id
 * @route public /ap1/v1/product/:id
 */
const getProductById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const foundProduct = await Product.findById(id)
    .select('title description imageUrl productInfo createdAt updatedAt')
    .exec();

  if (!foundProduct) return next(new ApiError(httpStatus.BAD_REQUEST, 'sản phẩm không tồn tại'));

  return res.status(httpStatus.OK).json(responseBody(SUCCESS, foundProduct));
});

/**
 * @desc delete a category by id
 * @route private /ap1/v1/product/:id
 */
const deleteById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const foundProduct = await Product.findById(id).exec();
  if (!foundProduct) return next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục không tồn tại'));

  await foundProduct.deleteOne();

  return res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS });
});

export const product = {
  create,
  update,
  getProducts,
  getProductById,
  deleteById,
};
