import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/user.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

const queryFn = async () => {
  const res = await api.get('/users/');
  return res.data;
};

export const useUser = () => {
  return useQuery<User, ApiError>(['user'], () => queryFn());
};
