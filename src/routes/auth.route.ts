import express from 'express';
import { validateRequest, verifyRefreshToken } from '../middleware';
import { auth } from '../controllers/auth.controller';
import { authValidators } from '../validations/auth.validation';

const route = express.Router();

route.post('/register', validateRequest(authValidators.register), auth.register);
route.post('/login', validateRequest(authValidators.login), auth.login);
route.post('/refreshToken', validateRequest(authValidators.refreshToken), verifyRefreshToken, auth.refreshToken);
route.delete('/logout', validateRequest(authValidators.refreshToken), verifyRefreshToken, auth.logout);

export default route;
