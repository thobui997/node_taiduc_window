import express from 'express';
import { validateRequest } from '../middleware/validate-request';
import verifyAccessToken from '../middleware/verify-access-token';
import productCategoryValidators from '../validations/category.validation';
import { productCategory } from '../controllers/category.controller';

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
