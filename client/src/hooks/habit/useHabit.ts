import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

const queryFn = async (_id: string) => {
  const res = await api.get(`/habits/${_id}`);
  return res.data;
};

export const useHabit = (_id: string) => {
  const queryClient = useQueryClient();
  return useQuery<Habit, ApiError>(['habit', _id], () => queryFn(_id), {
    initialData: () =>
      queryClient.getQueryData<Habit[]>(['habits'])?.find((d) => d._id == _id),
  });
};
