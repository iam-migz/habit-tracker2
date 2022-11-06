import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

type AddDateParams = {
  date: Date;
};

const mutationFn = async (
  id: string,
  userToken: string | null,
  params: AddDateParams,
) => {
  const res = await api.patch(
    `/habit/addDate/${id}`,
    { date: params.date },
    {
      headers: getJWTHeader(userToken),
    },
  );
  return res.data;
};

export const useAddDate = (id: string) => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<{ ok: boolean }, ApiError, AddDateParams>(
    (params) => mutationFn(id, userToken, params),
    {
      onMutate: async (newDate) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ['habit', id, userToken] });

        // Snapshot the previous value
        const previousHabit = queryClient.getQueryData<any>([
          'habit',
          id,
          userToken,
        ]);
        const newHabit = {
          ...previousHabit,
          dates: [...previousHabit.dates, newDate.date],
        };

        // Optimistically update to the new value
        queryClient.setQueryData(['habit', id, userToken], newHabit);

        // Return a context with the previous and new todo
        return { previousHabit, newHabit };
      },
      onError: (_error, _newDate, context: any) => {
        queryClient.setQueryData(
          ['habit', id, userToken],
          context.previousHabit,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['habit', id, userToken]);
      },
    },
  );
};
