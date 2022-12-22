import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '../utils/axios';
import { Tokens } from '../types/tokens.types';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password too short - 6 chars minimum'),
});

export type LoginInput = z.TypeOf<typeof LoginSchema>;

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const { mutate, isLoading } = useMutation<Tokens, AxiosError, LoginInput>(
    async (value: LoginInput) => {
      const res = await api.post('/sessions', value);
      return res.data;
    },
  );

  const onSubmit = async (values: LoginInput) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err) => {
        setErrorMsg(err.response?.data as string);
      },
    });
  };

  return (
    <div className="h-screen bg-sky-200 grid place-items-center ">
      <div className="bg-white w-4/5 mx-auto p-4 mb-40 shadow-lg rounded md:w-96">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-xl">Login</h1>

          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              type="email"
              id="email"
              required
              {...register('email')}
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              type="password"
              id="password"
              required
              {...register('password')}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="error">{errorMsg}</div>

          <button className="bg-green-400 btn " type="submit">
            Submit
          </button>
          {/* loading icon */}
          {isLoading && (
            <ArrowPathIcon className="w-5 h-5 inline-block ml-1 animate-spin" />
          )}
        </form>
        <div className="mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500  hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
