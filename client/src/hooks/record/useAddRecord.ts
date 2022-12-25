import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

type AddRecordParams = {
  date: string;
  image?: string;
  note?: string;
};

const mutationFn = async (record: AddRecordParams) => {
  const res = await api.post('/records/', record);
  return res.data;
};

export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError, AddRecordParams>(
    (record) => mutationFn(record),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['records']);
      },
    },
  );
};
