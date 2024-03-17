import {useCallback} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {post} from '../../authenticated-fetch'
import {LoginResponse} from '../../dto'
import {AuthenticationState} from '../../enum'
import {toast} from 'react-toastify';

type Properties = {
  goHome: () => void
}

const schema = yup.object({
  email: yup.string().email().required()
}).required();

export default function ForgotPassword({ goHome }: Properties) {
  const token = useSelector(selectToken)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback((data: { email: string }) => {
    post<LoginResponse>('/api/auth/request-password-change', {
      email: data.email
    }, token).then((data) => {
      if(data.state === AuthenticationState.AUTH_STATE_SUCCESS) {
        toast.success("If an account with this email exists, you'll get an email.")
        goHome()
      } else {
        toast.error(data.state);
      }
    })
  }, [goHome, token]);
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email Address
        </label>
        <div className="mt-2">
          <input
            {...register("email")}
            type="text"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="w-1/3 rounded-md bg-indigo-600 px-3 py-1.5 mr-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => goHome()}
          >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 rounded-md bg-indigo-600 px-3 py-1.5 ml-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Sent Reset Email
        </button>
      </div>
    </form>
    );
}