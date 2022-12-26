import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

type AddHabitParams = {
  name: string;
  description: string;
};

const mutationFn = async (habit: AddHabitParams) => {
  const res = await api.post('/habits/', habit);
  return res.data;
};

export const useAddHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, AddHabitParams>(
    (habit) => mutationFn(habit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habits']);
      },
    },
  );
};
