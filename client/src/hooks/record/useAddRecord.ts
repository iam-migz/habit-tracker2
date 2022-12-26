import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

type AddRecordParams = {
  date: Date;
  image?: string;
  note?: string;
};

const mutationFn = async (record: AddRecordParams, habitId: string) => {
  const res = await api.post(`/records?habitId=${habitId}`, record);
  return res.data;
};

export const useAddRecord = (habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError, AddRecordParams>(
    (record) => mutationFn(record, habitId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['records']);
      },
    },
  );
};
