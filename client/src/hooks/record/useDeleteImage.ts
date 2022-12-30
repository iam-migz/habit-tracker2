import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

const mutationFn = async (recordId: string) => {
  const res = await api.patch(`/records/deleteImage/${recordId}`);
  return res.data;
};

export const useDeleteImage = (recordId: string, habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError>(() => mutationFn(recordId), {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['records', habitId] });
    },
  });
};
