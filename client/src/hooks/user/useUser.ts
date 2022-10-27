import { useQuery } from 'react-query';
import { useUserToken } from '../../stores/userToken';
import { User } from '../../types/user.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';

const queryFn = async (userToken: string | null) => {
  const res = await api.get('/user/', {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useUser = () => {
  const { userToken, setUserToken } = useUserToken();
  return useQuery<User, ApiError>(
    ['user', userToken],
    () => queryFn(userToken),
    {
      onSuccess: (data) => console.log(data),
      onError: (err) => {
        if (err.response?.status == 401) {
          setUserToken(null);
        }
      },
    },
  );
};
