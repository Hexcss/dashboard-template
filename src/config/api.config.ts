import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { ENDPOINTS, type ApiServer } from './endpoints.config';

export function createApiClient(server: ApiServer, extraConfig?: AxiosRequestConfig): AxiosInstance {
  const { baseURL } = ENDPOINTS[server];

  const instance = axios.create({
    baseURL,
    timeout: 20_000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    ...extraConfig,
  });

  // Request interceptor (e.g. attach tokens)
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('zb_auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Response interceptor (global errors, refresh, etc.)
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        console.warn(`[${server}] Unauthorized — redirecting to login`);
        // handle token expiry / redirect logic here
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
