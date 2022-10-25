import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { Token, ApiError } from '../../types/util.types';
import { useTokenContext } from '../../contexts/TokenContext';
import { setStoredToken } from '../../utils/localStorage';

type LoginParams = {
  email: string;
  password: string;
};

const mutationFn = async (user: LoginParams) => {
  const res = await api.post('/user/login', {
    email: user.email,
    password: user.password,
  });
  return res.data;
};

export const useLogin = () => {
  const { setUserToken } = useTokenContext();
  return useMutation<Token, ApiError, LoginParams>((user) => mutationFn(user), {
    onSuccess: (data) => {
      setUserToken(data.token);
      setStoredToken(data.token);
    },
  });
};
