import { basicInfo } from './basic-info';
import { components } from './components';
import { servers } from './servers';
import { tags } from './tags';
import docsApi from './docs-api';

export const docs = {
  ...basicInfo,
  ...components,
  ...servers,
  ...tags,
  ...docsApi,
};
