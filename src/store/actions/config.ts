import { AxiosResponse } from 'axios';

async function responseHandler(callback: Promise<AxiosResponse>): Promise<AxiosResponse<any>> {
  let response: AxiosResponse<any> = {} as AxiosResponse<any>;
  try {
    response = await callback;
  } catch (error: any) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  return response;
}

export default responseHandler;
