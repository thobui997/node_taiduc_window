import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import verifyRefreshToken from '../../middleware/verifyRefreshToken';
import { auth } from './auth.controller';
import { authValidators } from './auth.validation';

const route = express.Router();

route.post('/register', validateRequest(authValidators.register), auth.register);
route.post('/login', validateRequest(authValidators.login), auth.login);
route.post('/refreshToken', validateRequest(authValidators.refreshToken), verifyRefreshToken, auth.refreshToken);
route.delete('/logout', validateRequest(authValidators.refreshToken), verifyRefreshToken, auth.logout);

export { route as AuthRoute };
