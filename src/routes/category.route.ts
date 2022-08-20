import express from 'express';
import { validateRequest, verifyAccessToken } from '../middleware';
import { productCategory } from '../controllers/category.controller';
import productCategoryValidators from '../validations/category.validation';

const route = express.Router();

route
  .route('/')
  .get(productCategory.getCategories)
  .post(validateRequest(productCategoryValidators.productCategory), verifyAccessToken, productCategory.create);

route
  .route('/:id')
  .get(productCategory.getCategoryById)
  .put(validateRequest(productCategoryValidators.productCategory), verifyAccessToken, productCategory.update)
  .delete(verifyAccessToken, productCategory.deleteById);

export default route;
