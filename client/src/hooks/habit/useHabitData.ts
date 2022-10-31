import { useQuery } from 'react-query';
import { useUserToken } from '../../stores/userToken';
import { Habit } from '../../types/habit.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

const queryFn = async (userToken: string | null) => {
  const res = await api.get('/habit/', {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useHabitData = () => {
  const { userToken } = useUserToken();
  return useQuery<Habit[], ApiError>(['habits', userToken], () =>
    queryFn(userToken),
  );
};
