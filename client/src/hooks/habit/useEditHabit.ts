import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

type EditHabitParams = {
  name: string;
  description: string;
};

const mutationFn = async (id: string, habit: EditHabitParams) => {
  const res = await api.put(`/habits/${id}`, habit);
  return res.data;
};

export const useEditHabit = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, EditHabitParams>(
    (habit) => mutationFn(id, habit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habit', id]);
      },
    },
  );
};
