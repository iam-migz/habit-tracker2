import { useQuery } from 'react-query';
import { User } from '../../types/user.types';
import { ApiError } from '../../types/util.types';
import { api, getJWTHeader } from '../../utils/api';
import { useTokenContext } from '../../contexts/TokenContext';
import { clearStoredToken } from '../../utils/localStorage';

const queryFn = async (userToken: string) => {
  const res = await api.get('/user/', {
    headers: getJWTHeader(userToken),
  });
  return res.data;
};

export const useUser = () => {
  const { userToken, setUserToken } = useTokenContext();
  return useQuery<User, ApiError>(
    ['user', userToken],
    () => queryFn(userToken),
    {
      onSuccess: (data) => console.log(data),
      onError: (err) => {
        if (err.response?.status == 401) {
          // invalid token
          clearStoredToken();
          setUserToken('');
        }
      },
    },
  );
};
