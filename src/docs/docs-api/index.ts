import { login, logout, refresh, register } from './auth';
import { create, getAll, getById, update, deleteById } from './product-category';

const AUTH_PREFIX = '/api/v1/auth';
const PRODUCT_CATEGORY_PREFIX = '/api/v1/category';

const docsApi = {
  paths: {
    [`${AUTH_PREFIX}/register`]: { ...register },
    [`${AUTH_PREFIX}/login`]: { ...login },
    [`${AUTH_PREFIX}/refresh`]: { ...refresh },
    [`${AUTH_PREFIX}/logout`]: { ...logout },
    [`${PRODUCT_CATEGORY_PREFIX}`]: { ...getAll, ...create },
    [`${PRODUCT_CATEGORY_PREFIX}/{id}`]: { ...update, ...getById, ...deleteById },
  },
};
export default docsApi;
