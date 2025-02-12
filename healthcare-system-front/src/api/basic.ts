import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from '@/config';
const apiClient = axios.create({
  baseURL: config.auth.backend.authUrlBackend,
  withCredentials: true,
});

export const handleRequest = async <T>(
  requestConfig: AxiosRequestConfig,
  token?: string,
): Promise<T> => {
  try {
    const headers = token
      ? { ...requestConfig.headers, Authorization: `Bearer ${token}` }
      : requestConfig.headers;

    const response: AxiosResponse<T> = await apiClient({
      ...requestConfig,
      headers,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error(`API Error [${requestConfig.method?.toUpperCase()} ${requestConfig.url}]:`, {
      status: axiosError.response?.status,
      message: axiosError.response?.data?.message || axiosError.message,
      data: axiosError.config?.data,
    });
    throw {
      status: axiosError.response?.status || 500,
      message: axiosError.response?.data?.message || 'Unknown error',
      code: axiosError.code,
      originalError: axiosError,
    };
  }
};
