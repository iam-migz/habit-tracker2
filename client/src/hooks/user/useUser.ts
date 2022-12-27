import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../../types/user.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

const queryFn = async () => {
  const res = await api.get('/users/');
  return res.data;
};

export const useUser = (config?: UseQueryOptions<User, ApiError>) => {
  return useQuery<User, ApiError>(['user'], () => queryFn(), { ...config });
};
