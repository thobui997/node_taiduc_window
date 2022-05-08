import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import User from './auth.model';
import { ApiError } from '../../../exceptions/apiError';
import { asyncHandler } from './../helpers/async';

const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, confirmPassword } = req.body;
  // check password
  if (password !== confirmPassword) {
    return next(
      new ApiError(httpStatus.BAD_REQUEST, 'ConfirmPassword không trùng khớp với mật khẩu của bạn!')
    );
  }

  const user = await User.findOne({ username });

  // check user existed?
  if (user) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Username đã được đăng ký'));
  }

  // create a new user
  const newUser = new User({
    username,
    password,
  });

  await newUser.save();

  return res.status(200).json({
    status: 'success',
  });
});

const login = asyncHandler((req: Request, res: Response, next: NextFunction) => {});

const logout = asyncHandler((req: Request, res: Response, next: NextFunction) => {});

const refreshToken = asyncHandler((req: Request, res: Response, next: NextFunction) => {});

export const auth = {
  register,
  login,
  refreshToken,
  logout,
};
