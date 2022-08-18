import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import { env } from '../config/config-env';
import { ResponseStatus } from '../enums/response-status';
import { ApiError } from '../exceptions/api-error';
import { asyncHandler, responseBody, signAccessToken, signRefreshToken } from '../helpers';
import { User } from '../models';

const SUCCESS = ResponseStatus.SUCCESS;

/**
 * @desc tạo mới 1 user
 * @route public /api/v1/auth/register
 */
const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, confirmPassword } = req.body;
  // check password
  if (password !== confirmPassword) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'ConfirmPassword không trùng khớp với mật khẩu của bạn!'));
  }

  const foundUser = await User.findOne({ username }).exec();

  // check user existed?
  if (foundUser) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'username đã được đăng ký'));
  }

  // create a new user
  const newUser = new User({
    username,
    password,
  });

  await newUser.save();

  return res.status(httpStatus.OK).json(responseBody(SUCCESS));
});

/**
 * @desc login
 * @route public /api/v1/auth/login
 */
const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  // check user has been registered
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'username chưa được đăng ký'));
  }

  // check password
  const isValidPassword = await foundUser.checkValidPassword(password);
  if (!isValidPassword) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'username hoặc password không đúng'));
  }

  const accessToken = await signAccessToken(foundUser._id);
  const refreshToken = await signRefreshToken(foundUser._id);

  await foundUser.updateOne({ refreshToken }).exec();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: env.nodeEnv === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(httpStatus.OK).json(
    responseBody(SUCCESS, {
      accessToken,
    })
  );
});

/**
 * @desc logout
 * @route public /api/v1/auth/logout
 */
const logout = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.sendStatus(204);
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: env.nodeEnv === 'production' });
    return res.sendStatus(204);
  }

  // delete refresh token in db
  await foundUser.updateOne({ refreshToken: '' }).exec();
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: env.nodeEnv === 'production' });
  return res.sendStatus(204);
});

/**
 * @desc tạo mới access token khi token hiện tại hết hạn
 * @route public /api/v1/auth/refresh
 */
const refresh = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(new ApiError(httpStatus.UNAUTHORIZED, ''));

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return next(new ApiError(httpStatus.FORBIDDEN, ''));
  }

  verify(refreshToken, env.refreshTokenSecret, undefined, async (err, payload: any) => {
    if (err || foundUser._id.toString() !== payload.userId.toString()) {
      return next(new ApiError(httpStatus.FORBIDDEN, ''));
    }
    const newAccessToken = await signAccessToken(foundUser._id);

    return res.status(httpStatus.OK).json(
      responseBody(SUCCESS, {
        accessToken: newAccessToken,
      })
    );
  });
});

export const auth = {
  register,
  login,
  refresh,
  logout,
};
