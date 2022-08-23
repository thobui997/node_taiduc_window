import express from 'express';
import productValidators from '../validations/product.validation';
import { product } from '../controllers/product.controller';
import { verifyAccessToken, validateRequest } from '../middleware';

const route = express.Router();

route
  .route('/')
  .get(product.getProducts)
  .post(verifyAccessToken, validateRequest(productValidators.product), product.create);

route
  .route('/:id')
  .get(product.getProductById)
  .put(verifyAccessToken, validateRequest(productValidators.product), product.update)
  .delete(verifyAccessToken, product.deleteById);

export default route;
