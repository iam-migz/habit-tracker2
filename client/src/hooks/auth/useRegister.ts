import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError, Token } from '../../types/util.types';
import { setStoredToken } from '../../utils/localStorage';
import { useTokenContext } from '../../contexts/TokenContext';

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

const mutationFn = (user: RegisterParams) => {
  return api.post('/user/register', {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

export const useRegister = () => {
  const { setUserToken } = useTokenContext();
  return useMutation<
    AxiosResponse<Token>,
    AxiosError<ApiError>,
    RegisterParams
  >((user) => mutationFn(user), {
    onSuccess: (res) => {
      setUserToken(res.data.token);
      setStoredToken(res.data.token);
    },
  });
};
