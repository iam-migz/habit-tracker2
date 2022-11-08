import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

type EditHabitParams = {
  name: string;
  description: string;
  includeImages: boolean;
};

const mutationFn = async (
  id: string,
  userToken: string | null,
  habit: EditHabitParams,
) => {
  const res = await api.patch(`/habit/${id}`, habit, {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useEditHabit = (id: string) => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, EditHabitParams>(
    (habit) => mutationFn(id, userToken, habit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habit', id, userToken]);
      },
    },
  );
};
