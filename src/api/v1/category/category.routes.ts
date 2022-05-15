import express from 'express';
import { validateRequest } from './../middleware/validateRequest';
import verifyAccessToken from './../middleware/verifyAccessToken';
import productCategoryValidators from './category.validation';
import { productCategory } from './category.controller';

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

export { route as ProductCategoryRoute };
