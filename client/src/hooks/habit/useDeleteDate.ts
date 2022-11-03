import { useMutation, useQueryClient } from 'react-query';
import { useUserToken } from '../../stores/userToken';
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
    `/habit/removeDate/${id}`,
    { date: params.date },
    {
      headers: getJWTHeader(userToken),
    },
  );
  return res.data;
};

export const useDeleteDate = (id: string) => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();

  return useMutation<{ ok: boolean }, ApiError, AddDateParams>(
    (params) => mutationFn(id, userToken, params),
    {
      onMutate: async (newDate) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ['habit', id, userToken] });

        // Snapshot the previous value
        const previousHabit = queryClient.getQueryData([
          'habit',
          id,
          userToken,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(['habit', id, userToken], (oldData: any) => {
          return {
            ...oldData,
            dates: oldData.dates.filter(
              (d: any) =>
                new Date(d).getTime() !== new Date(newDate.date).getTime(),
            ),
          };
        });

        // Return a context with the previous and new todo
        // fix
        return { previousHabit };
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
