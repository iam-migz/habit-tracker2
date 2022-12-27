import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

const queryFn = async (_id: string) => {
  const res = await api.get(`/records/${_id}`);
  return res.data;
};

export const useRecord = (_id: string) => {
  return useQuery<Record[], ApiError>(['record', _id], () => queryFn(_id));
};
