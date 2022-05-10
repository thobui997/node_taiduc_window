import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import User from './auth.model';
import { ApiError } from '../../../exceptions/apiError';
import { asyncHandler } from './../helpers/async';
import { signAccessToken } from './../helpers/jwt-service';
import { ResponseStatus } from './../enums/responseStatus';

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

  return res.status(httpStatus.OK).json({
    status: ResponseStatus.SUCCESS,
  });
});

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  // check user has been registered
  const user = await User.findOne({ username });
  if (!user) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'username hoặc password không đúng'));
  }

  // check password
  const isValidPassword = await user.checkValidPassword(password);
  if (!isValidPassword) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'username hoặc password không đúng'));
  }

  const accessToken = await signAccessToken(user._id);

  return res.status(httpStatus.OK).json({
    status: ResponseStatus.SUCCESS,
    accessToken,
  });
});

const logout = asyncHandler((req: Request, res: Response, next: NextFunction) => {});

const refreshToken = asyncHandler((req: Request, res: Response, next: NextFunction) => {});

export const auth = {
  register,
  login,
  refreshToken,
  logout,
};
