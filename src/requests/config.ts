import axios from 'axios';
import { API_URL } from '@/config';

export const getAxiosInstance = () => axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getAxiosInstanceNoAuth = () => axios.create({
  baseURL: API_URL,
});
