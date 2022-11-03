import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

type DeleteHabitParams = {
  id: string;
};

const mutationFn = async (
  userToken: string | null,
  params: DeleteHabitParams,
) => {
  const res = await api.delete(`/habit/${params.id}`, {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useDeleteHabit = () => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiError, DeleteHabitParams>(
    (params) => mutationFn(userToken, params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['habits', userToken]);
      },
    },
  );
};
