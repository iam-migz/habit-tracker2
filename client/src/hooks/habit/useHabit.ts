import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

const queryFn = async (_id: string, userToken: string | null) => {
  const res = await api.get(`/habit/${_id}`, {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useHabit = (_id: string) => {
  const { userToken } = useUserToken();
  const queryClient = useQueryClient();
  return useQuery<Habit, ApiError>(
    ['habit', _id, userToken],
    () => queryFn(_id, userToken),
    {
      initialData: () => {
        const initial: Habit = {
          _id: '',
          name: '',
          description: '',
          dates: [],
          userId: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const res = queryClient
          .getQueryData<Habit[]>(['habits', userToken])
          ?.find((d) => d._id == _id);
        return res == undefined ? initial : res;
      },
    },
  );
};
