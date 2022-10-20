import { useMutation } from 'react-query';
import { api } from '../../utils/api';
import { AxiosResponse, AxiosError } from 'axios';
import { RegisterDto, UserResponse } from '../../types/user.types';
import { ApiErrorResponse } from '../../types/util.types';

const register = (user: RegisterDto) => {
  return api.post(`/user/register`, user);
};

export const useRegister = () => {
  return useMutation<
    AxiosResponse<UserResponse>,
    AxiosError<ApiErrorResponse>,
    RegisterDto
  >(register, {
    onSuccess: (data) => {
      // save user token & user info
      console.log(data);
    },
  });
};
