import { login } from './login';
import { register } from './register';

const PREFIX = '/api/v1/auth';

export const auth = {
  paths: {
    [`${PREFIX}/register`]: { ...register },
    [`${PREFIX}/login`]: { ...login },
  },
};
