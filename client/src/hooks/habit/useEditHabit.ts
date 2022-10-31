import { useMutation, useQueryClient } from 'react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

type EditHabitParams = {
  _id: string;
  name: string;
  description: string;
};

const mutationFn = async (userToken: string | null, habit: EditHabitParams) => {
  console.log('habit', habit);
  const res = await api.patch(`/habit/${habit._id}`, habit, {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useEditHabit = () => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, EditHabitParams>(
    (habit) => mutationFn(userToken, habit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habits', userToken]);
      },
    },
  );
};
