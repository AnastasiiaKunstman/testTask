import axios from 'axios';
import md5 from 'md5';
import { PASSWORD, BASE_URL } from '../utils';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const TIMESTAMP = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const AUTH_STRING = md5(PASSWORD + '_' + TIMESTAMP);

  config.headers['X-Auth'] = AUTH_STRING;

  return config;
});