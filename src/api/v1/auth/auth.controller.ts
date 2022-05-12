import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../../../exceptions/apiError';
import { ResponseStatus } from './../enums/responseStatus';
import { asyncHandler } from './../helpers/async';
import { signAccessToken, signRefreshToken } from './../helpers/jwt-service';
import User from './auth.model';
import client from '../../../config/connect-redis';

const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, confirmPassword } = req.body;
  // check password
  if (password !== confirmPassword) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'ConfirmPassword không trùng khớp với mật khẩu của bạn!'));
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
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'username hoặc password không đúng'));
  }

  // check password
  const isValidPassword = await user.checkValidPassword(password);
  if (!isValidPassword) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'username hoặc password không đúng'));
  }

  const accessToken = await signAccessToken(user._id);
  const refreshToken = await signRefreshToken(user._id);

  return res.status(httpStatus.OK).json({
    status: ResponseStatus.SUCCESS,
    accessToken,
    refreshToken,
  });
});

const logout = asyncHandler((req: Request | any, res: Response, next: NextFunction) => {
  const { userId } = req.payload;
  client
    .del(userId.toString())
    .then(() => res.status(httpStatus.OK).json({ status: ResponseStatus.SUCCESS }))
    .catch((err) => next(err));
});

const refreshToken = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const newAccessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res.status(httpStatus.OK).json({
      status: ResponseStatus.SUCCESS,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return next(error);
  }
});

export const auth = {
  register,
  login,
  refreshToken,
  logout,
};
