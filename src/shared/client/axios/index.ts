import axios, { AxiosInstance } from 'axios';

const config = {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,multipart/form-data',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  },
};

export default (baseURL: string, path: string, headers?: any): AxiosInstance =>
  axios.create({
    ...config,
    baseURL: `${baseURL}/${path}`,
    headers: {
      common: headers,
    },
  });
