import { useMutation } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { ApiError, Token } from '../../types/util.types';
import { useUserToken } from '../../stores/userToken';

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

const mutationFn = async (user: RegisterParams) => {
  const res = await api.post('/user/register', {
    name: user.name,
    email: user.email,
    password: user.password,
  });
  return res.data;
};

export const useRegister = () => {
  const setUserToken = useUserToken((state) => state.setUserToken);
  return useMutation<Token, ApiError, RegisterParams>(
    (user) => mutationFn(user),
    {
      onSuccess: (res) => {
        setUserToken(res.token);
      },
    },
  );
};
