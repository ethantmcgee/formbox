import {useCallback} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {CheckAvailabilityResponse, ApiUser} from '../../types';
import {get, put, post} from '../../authenticated-fetch'
import {toast} from 'react-toastify';

type Properties = {
  goToTable: () => void,
  userToBeEdited: ApiUser | null
}

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required()
}).required();

export default function UserForm({ goToTable, userToBeEdited }: Properties) {
  const token = useSelector(selectToken)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: userToBeEdited?.username || '',
      email: userToBeEdited?.email || ''
    }
  });

  const forcePasswordReset = useCallback(() => {
    get(`/api/users/${userToBeEdited?.id || 0}/force-password-reset`, token).then(() => {
      toast.success("User will be required to change password on next login");
    });
    }, [token, userToBeEdited?.id]);

  const onSubmit = useCallback((data: { username: string, email: string }) => {
    get<CheckAvailabilityResponse>(`/api/settings/check-username/${data.username}`, token).then((resp) => {
      if(resp.available) {
        get<CheckAvailabilityResponse>(`/api/settings/check-email/${data.email}`, token).then((resp) => {
          if(resp.available) {
            if(userToBeEdited) {
              userToBeEdited.username = data.username;
              userToBeEdited.email = data.email;
              put('/api/users/', userToBeEdited, token).then(() => {
                toast.success("User Created");
                goToTable();
              });
            } else {
              post('/api/users/', {
                username: data.username,
                email: data.email
              }, token).then(() => {
                toast.success("User Updated");
                goToTable();
              });
            }
          } else {
            toast.error("This email is not available");
          }
        });
      } else {
        toast.error("This username is not available");
      }
    });
    }, [goToTable, token, userToBeEdited]);

  return (
    <>
      <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-1.5">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
        </div>
        <div className="py-1.5">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {
            (userToBeEdited?.id || -1) >= 0 ? (
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => forcePasswordReset()}>
                Force Password Reset
              </button>
            ) : (
              <></>
            )
          }
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToTable()}>
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Save
          </button>
        </div>
      </form>
    </>
  )
}