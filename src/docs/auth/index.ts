import { login } from './login';
import { logout } from './logout';
import { refresh } from './refresh';
import { register } from './register';

const PREFIX = '/api/v1/auth';

export const auth = {
  paths: {
    [`${PREFIX}/register`]: { ...register },
    [`${PREFIX}/login`]: { ...login },
    [`${PREFIX}/refresh`]: { ...refresh },
    [`${PREFIX}/logout`]: { ...logout },
  },
};
