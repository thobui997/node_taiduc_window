import Joi from 'joi';

const productSchema = Joi.object({
  title: Joi.string().required().trim().lowercase().min(4).max(50).messages({
    'string.base': `"tên sản phẩm" nên là một chuỗi`,
    'string.min': `"tên sản phẩm" có độ dài ít nhất 4 ký tự`,
    'string.max': `"tên sản phẩm" có độ dài tối đa là 50 ký tự`,
    'string.empty': `"tên sản phẩm" không được để trống`,
    'any.required': `"tên sản phẩm" là bắt buộc`,
  }),
  description: Joi.string().required().trim().messages({
    'any.required': `"mô tả sản phẩm" là bắt buộc`,
  }),
  imageUrl: Joi.string().required().trim().messages({
    'any.required': `"ảnh sản phẩm" là bắt buộc`,
  }),
  categoryId: Joi.string().required().trim().messages({
    'any.required': `"danh mục sản phẩm" là bắt buộc`,
  }),
});

const productValidators = {
  product: productSchema,
};

export default productValidators;
