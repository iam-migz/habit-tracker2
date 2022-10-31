import { useMutation, useQueryClient } from 'react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

type AddHabitParams = {
  name: string;
  description: string;
};

const mutationFn = async (userToken: string | null, habit: AddHabitParams) => {
  const res = await api.post('/habit/', habit, {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useAddHabit = () => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, AddHabitParams>(
    (habit) => mutationFn(userToken, habit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habits', userToken]);
      },
    },
  );
};
