import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().trim().min(4).max(20).lowercase().required().messages({
    'string.base': `"username" nên là một chuỗi`,
    'string.min': `"username" có độ dài ít nhất 6 ký tự`,
    'string.max': `"username" có độ dài tối đa là 20 ký tự`,
    'string.empty': `"username" không được để trống`,
    'any.required': `"username" là bắt buộc`,
  }),
  password: Joi.string().trim().min(6).required().messages({
    'string.base': `"password" nên là một chuỗi`,
    'string.min': `"password" có độ dài ít nhất 6 ký tự`,
    'string.empty': `"password" không được để trống`,
    'any.required': `"password" là bắt buộc`,
  }),
  confirmPassword: Joi.string().trim().min(6).required().messages({
    'string.base': `"confirmPassword" nên là một chuỗi`,
    'string.min': `"confirmPassword" có độ dài ít nhất 6 ký tự`,
    'string.empty': `"confirmPassword" không được để trống`,
    'any.required': `"confirmPassword" là bắt buộc`,
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().trim().min(4).max(20).lowercase().required().messages({
    'string.base': `"username" nên là một chuỗi`,
    'string.min': `"username" có độ dài ít nhất 6 ký tự`,
    'string.max': `"username" có độ dài tối đa là 20 ký tự`,
    'string.empty': `"username" không được để trống`,
    'any.required': `"username" là bắt buộc`,
  }),
  password: Joi.string().trim().min(6).required().messages({
    'string.base': `"password" nên là một chuỗi`,
    'string.min': `"password" có độ dài ít nhất 6 ký tự`,
    'string.empty': `"password" không được để trống`,
    'any.required': `"password" là bắt buộc`,
  }),
});

export const authValidators = {
  register: registerSchema,
  login: loginSchema,
};
