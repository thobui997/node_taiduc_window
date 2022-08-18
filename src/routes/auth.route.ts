import express from 'express';
import { validateRequest } from '../middleware';
import { auth } from '../controllers/auth.controller';
import { authValidators } from '../validations/auth.validation';

const route = express.Router();

route.post('/register', validateRequest(authValidators.register), auth.register);
route.post('/login', validateRequest(authValidators.login), auth.login);
route.post('/refresh', auth.refresh);
route.post('/logout', auth.logout);

export default route;
