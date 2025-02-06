import { AxiosInstance } from 'axios';
import axios from './axios';

class ApiService {
  protected readonly apiInstance: AxiosInstance;
  protected readonly token: string | null;

  constructor(path: string, token: string | null) {
    this.token = token;

    this.apiInstance = token
      ? axios(import.meta.env.VITE_API_URL, path, {
          Authorization: `Bearer ${token}`,
        })
      : axios(import.meta.env.VITE_API_URL_LOCAL, path);
  }

  protected handleError(error: any) {
    const { response } = error;

    return response;
  }
}

export default ApiService;
