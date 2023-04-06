import { getAxiosInstance, getAxiosInstanceNoAuth } from '@/requests/config';

export const loginViaCabinetRequest = (email: string, password: string) => getAxiosInstanceNoAuth().post(
  '/api/auth/login_kpi',
  { email, password },
);

export const fetchAzureLoginUrl = () => getAxiosInstanceNoAuth().get(
  '/api/auth/url',
);

export const loginViaAzureRequest = () => getAxiosInstanceNoAuth().post(
  '/api/auth/login',
);

export const logoutRequest = () => getAxiosInstance().post(
  '/api/auth/logout',
);

export const refreshRequest = () => getAxiosInstance().post(
  '/api/auth/refresh',
);
