import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  loginViaAzureRequest,
  loginViaCabinetRequest,
  fetchAzureLoginUrl,
  logoutRequest,
  refreshRequest,
} from '@/requests/login';

export const loginViaCabinet = createAsyncThunk(
  'login_via_cabinet',
  async ({ email, password }: { email: string; password: string }) => (
    await loginViaCabinetRequest(email, password)
  ).data,
);

export const loginViaAzure = createAsyncThunk(
  'login_via_azure',
  async () => (
    await loginViaAzureRequest()
  ).data,
);

export const getAzureLoginUrl = createAsyncThunk(
  'get_azure_login_url',
  async () => (
    await fetchAzureLoginUrl()
  ).data,
);

export const logoutAction = createAsyncThunk(
  'logout_action',
  async () => (
    await responseHandler(logoutRequest())
  ).data,
);

export const refreshAction = createAsyncThunk(
  'refresh_action',
  async () => (
    await responseHandler(refreshRequest())
  ).data,
);
