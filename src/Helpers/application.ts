import {
  API_DEMO_URL,
  API_DEV_URL,
  API_PROD_URL,
  API_QA_URL,
  SF_APPS_URLS_DICT
} from '../Constants/Apps';
import { AppEnv, ApplicationProduct } from '../Models';

export const getAppBaseUrl = (
  env: AppEnv,
  product: ApplicationProduct
): string => {
  return SF_APPS_URLS_DICT[env][product];
};

export const getApiBaseUrl = (env: AppEnv): string => {
  switch (env) {
    case 'production':
      return API_PROD_URL;
    case 'qa':
      return API_QA_URL;
    case 'demo':
      return API_DEMO_URL;
    default:
      return API_DEV_URL;
  }
};
