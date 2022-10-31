import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/auth/useRegister';

function Register() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useRegister();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (err) => {
          if (err.response) {
            setErrorMsg(err.response.data.message);
          } else {
            setErrorMsg(err.message);
          }
        },
      },
    );
  };

  return (
    <div className="h-screen bg-sky-200 grid place-items-center ">
      <div className="bg-white w-4/5 mx-auto p-4 mb-40 shadow-lg rounded md:w-96">
        <form action="#" onSubmit={submitHandler}>
          <h1 className="text-center text-xl">Register</h1>

          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="name">Name</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              required
            />
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
