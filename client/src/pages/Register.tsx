import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../utils/axiosInstance';
import { User } from '../types/user.types';
import { ApiError } from '../types/util.types';

const RegisterSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, 'Name too short - 3 chars minimum'),
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

export type RegisterInput = z.TypeOf<typeof RegisterSchema>;

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate, isLoading } = useMutation<User, ApiError, RegisterInput>(
    async (value: RegisterInput) => {
      const res = await api.post('/users', value);
      return res.data;
    },
  );
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: RegisterInput) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (err) => {
        setErrorMsg(err.response?.data.message as string);
      },
    });
  };

  return (
    <div className="h-screen bg-sky-200 grid place-items-center ">
      <div className="bg-white w-4/5 mx-auto p-4 mb-40 shadow-lg rounded md:w-96">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-xl">Register</h1>

          <div className="flex flex-col mb-4">
            <label htmlFor="name">Name</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              type="text"
              id="name"
              required
              {...register('name')}
            />
            <p className="error">{errors.name?.message}</p>
          </div>

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

          <button className="bg-green-400 btn" type="submit">
            Submit
          </button>
          {/* loading icon */}
          {isLoading && (
            <ArrowPathIcon className="w-5 h-5 inline-block ml-1 animate-spin" />
          )}
        </form>
        <div className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500  hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
