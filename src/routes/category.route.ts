import express from 'express';
import { validateRequest, verifyAccessToken } from '../middleware';
import { productCategory } from '../controllers/category.controller';
import productCategoryValidators from '../validations/category.validation';

const route = express.Router();

route.post('/', validateRequest(productCategoryValidators.productCategory), verifyAccessToken, productCategory.create);

route.put(
  '/:id',
  validateRequest(productCategoryValidators.productCategory),
  verifyAccessToken,
  productCategory.updateById
);

route.get('/', productCategory.getCategories);
route.get('/:id', productCategory.getCategoryById);
route.delete('/:id', verifyAccessToken, productCategory.deleteById);

export default route;
