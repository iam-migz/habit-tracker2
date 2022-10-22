import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { Token, ApiError } from '../../types/util.types';
import { AxiosError, AxiosResponse } from 'axios';
import { useTokenContext } from '../../contexts/TokenContext';
import { setStoredToken } from '../../utils/localStorage';

type LoginParams = {
  email: string;
  password: string;
};

const mutationFn = (user: LoginParams) => {
  return api.post('/user/login', {
    email: user.email,
    password: user.password,
  });
};

export const useLogin = () => {
  const { setUserToken } = useTokenContext();
  return useMutation<AxiosResponse<Token>, AxiosError<ApiError>, LoginParams>(
    (user) => mutationFn(user),
    {
      onSuccess: (res) => {
        setUserToken(res.data.token);
        setStoredToken(res.data.token);
      },
    },
  );
};
