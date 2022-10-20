import axios from 'axios';
// import { ApiErrorResponse } from '../types/utils.types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getError = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
    return error.response.data.message;
  }
  return 'wasa';
};
