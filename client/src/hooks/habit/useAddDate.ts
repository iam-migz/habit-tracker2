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
      onSuccess: () => {
        queryClient.invalidateQueries(['habit', id, userToken]);
      },
    },
  );
};
