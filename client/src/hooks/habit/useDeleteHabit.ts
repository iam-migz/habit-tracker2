import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

type DeleteHabitParams = {
  id: string;
};

const mutationFn = async (params: DeleteHabitParams) => {
  const res = await api.delete(`/habit/${params.id}`);
  return res.data;
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, DeleteHabitParams>(
    (params) => mutationFn(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habits']);
      },
    },
  );
};
