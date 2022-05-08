import { validateRequest } from './../middleware/validateRequest';
import { auth } from './auth.controller';
import express from 'express';
import { authValidators } from './auth.validation';

const route = express.Router();

route.post('/register', validateRequest(authValidators.register), auth.register);

export { route as AuthRoute };
