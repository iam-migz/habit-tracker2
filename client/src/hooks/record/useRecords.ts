import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

const queryFn = async (habitId: string) => {
  const res = await api.get(`/records?habitId=${habitId}`);
  return res.data;
};

export const useRecords = (habitId: string) => {
  return useQuery<Record[], ApiError>(
    ['records', habitId],
    () => queryFn(habitId),
    {
      initialData: [],
    },
  );
};
