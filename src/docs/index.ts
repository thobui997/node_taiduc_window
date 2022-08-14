import { auth } from './auth';
import { basicInfo } from './basic-info';
import { components } from './components';
import { servers } from './servers';
import { tags } from './tags';

export const docs = {
  ...basicInfo,
  ...components,
  ...servers,
  ...tags,
  ...auth,
};
