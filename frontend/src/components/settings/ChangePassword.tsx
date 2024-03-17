import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useCallback} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {post} from '../../authenticated-fetch'
import {ChangePasswordResponse} from '../../dto'
import {ChangePasswordState} from '../../enum'
import {toast} from 'react-toastify';

const schema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().test(
    'has-number', 'New Password must contain one number', (value, context) => /\d/.test(value || '')
  ).test(
    'has-letter', 'New Password must contain one letter', (value, context) => /[a-zA-Z]/.test(value || '')
  ).test(
    'long-enough', 'New Password must contain 12 characters', (value, context) => (value || '').length >= 12
  ).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "Confirm password doesn't match").required()
}).required();

export default function ChangePassword() {
  const token = useSelector(selectToken)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback((data: { currentPassword: string, newPassword: string, confirmPassword: string }) => {
    post<ChangePasswordResponse>('/api/settings/password-change', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }, token).then((resp) => {
      if(resp.state === ChangePasswordState.CHANGE_PASSWORD_SUCCESS) {
        toast.success("Password changed")
      } else {
        toast.error(resp.state);
      }
    })
  }, [token])

  return (
    <>
    <h3 className="pt-3">Change Password</h3>
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        <div className="px-1 py-2">
          <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-gray-900">
            Current Password
          </label>
          <div className="mt-2">
            <input
              {...register("currentPassword")}
              type="password"
              autoComplete="password"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.currentPassword?.message}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-1 py-2">
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
        <div className="px-1 py-2">
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
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Change
        </button>
      </div>
    </form>
    </>
    )
}