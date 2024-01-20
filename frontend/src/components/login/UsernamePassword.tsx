import { useCallback } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Properties = {
  goToForgotPassword: () => void
  sendUsernamePassword: (arg0: string, arg1: string) => void
}

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
}).required();

export default function UsernamePassword({ goToForgotPassword, sendUsernamePassword }: Properties) {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = useCallback((data: { username: string, password: string }) => {
    sendUsernamePassword(data.username, data.password);
  }, [sendUsernamePassword]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2">
          <input
            {...register("username")}
            type="text"
            autoComplete="username"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p className="text-red-600">{errors.username?.message}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="text-sm">
            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => goToForgotPassword()}>
              Forgot password?
            </button>
          </div>
        </div>
        <div className="mt-2">
          <input
            {...register("password")}
            type="password"
            autoComplete="password"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Sign In
        </button>
      </div>
    </form>
  );
}