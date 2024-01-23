import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useCallback} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {post} from '../../authenticated-fetch'
import {AuthenticationState, LoginResponse} from '../../types'
import {toast} from 'react-toastify';

type Properties = {
  passwordChangeCode: string,
  goHome: () => void
}

const schema = yup.object({
  newPassword: yup.string().test(
    'has-number', 'New Password must contain one number', (value, context) => /\d/.test(value || '')
  ).test(
    'has-letter', 'New Password must contain one letter', (value, context) => /[a-zA-Z]/.test(value || '')
  ).test(
    'long-enough', 'New Password must contain 12 characters', (value, context) => (value || '').length >= 12
  ).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "Confirm password doesn't match").required()
}).required();

export default function ChangePassword({ passwordChangeCode, goHome }: Properties) {
  const token = useSelector(selectToken)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback((data: { newPassword: string, confirmPassword: string }) => {
    post<LoginResponse>('/api/auth/complete-change-password', {
      passwordResetToken: passwordChangeCode,
      newPassword: data.newPassword
    }, token).then((data) => {
      if(data.state === AuthenticationState.SUCCESS) {
        toast.success("Password changed successfully.  Please login")
        goHome()
      } else {
        toast.error(data.state);
      }
    })
  }, [token, goHome, passwordChangeCode])

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
            New Password
          </label>
          <div className="mt-2">
            <input
              {...register("newPassword")}
              type="password"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.newPassword?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              {...register("confirmPassword")}
              type="password"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
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
            Sign In
          </button>
        </div>
      </form>
    </>
    )
}