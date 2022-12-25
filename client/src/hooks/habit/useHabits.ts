import { useQuery } from '@tanstack/react-query';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';

const queryFn = async () => {
  const res = await api.get('/habits/');
  return res.data;
};

export const useHabits = () => {
  return useQuery<Habit[], ApiError>(['habits'], () => queryFn());
};
