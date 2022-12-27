import { AxiosError } from 'axios';

export type Token = {
  token: string;
};

export type ApiError = AxiosError<{ message: string; stack: string }>;
