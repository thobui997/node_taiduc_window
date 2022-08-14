import Joi from 'joi';

const productCategorySchema = Joi.object({
  name: Joi.string().required().trim().lowercase().min(4).max(50).messages({
    'string.base': `"tên danh mục" nên là một chuỗi`,
    'string.min': `"tên danh mục" có độ dài ít nhất 4 ký tự`,
    'string.max': `"tên danh mục" có độ dài tối đa là 50 ký tự`,
    'string.empty': `"tên danh mục" không được để trống`,
    'any.required': `"tên danh mục" là bắt buộc`,
  }),
});

const productCategoryValidators = {
  productCategory: productCategorySchema,
};

export default productCategoryValidators;
