import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get, post} from '../../authenticated-fetch'
import {GetUserResponse, CheckAvailabilityResponse, ChangeUsernameResponse, ChangeUsernameState} from '../../types'
import {toast} from 'react-toastify';

const schema = yup.object({
  username: yup.string().required()
}).required();

export default function ChangeUsername() {
  const token = useSelector(selectToken)
  
  const { setValue, getValues, register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = useCallback((data: { username: string }) => {
    get<CheckAvailabilityResponse>(`/api/settings/check-username/${data.username}`, token).then((resp) => {
      if(resp.available) {
        post<ChangeUsernameResponse>('/api/settings/username-change', {
          newUsername: data.username
        }, token).then((resp) => {
          if(resp.state === ChangeUsernameState.SUCCESS) {
            toast.success("Username changed")
          } else {
            toast.error(resp.state);
          }
        })
      } else {
        toast.error("Username already assigned");
      }
    })
  }, [token])
  
  useEffect(() => {
    if(!getValues("username")) {
      get<GetUserResponse>('/api/settings/get-user', token).then((data) => {
        setValue('username', data.username || '');
      })
    }
  })
  
  return (
    <>
      <h3 className="pt-3">Change Username</h3>
      <form className="mt-3 grid grid-cols-1 py-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
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