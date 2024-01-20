import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get, post} from '../../authenticated-fetch'
import {GetUserResponse, CheckAvailabilityResponse, ChangeEmailResponse, ChangeEmailState} from '../../types'
import {toast} from 'react-toastify';

const schema = yup.object({
  email: yup.string().email().required()
}).required();

export default function ChangeUsername() {
  const token = useSelector(selectToken)
  
  const { setValue, getValues, register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = useCallback((data: { email: string }) => {
    get<CheckAvailabilityResponse>(`/api/settings/check-email/${data.email}`, token).then((resp) => {
      if(resp.available) {
        post<ChangeEmailResponse>('/api/settings/email-change', {
          newEmail: data.email
        }, token).then((resp) => {
          if(resp.state === ChangeEmailState.SUCCESS) {
            toast.success("Email changed")
          } else {
            toast.error(resp.state);
          }
        })
      } else {
        toast.error("Email already assigned");
      }
    })
  }, [token])

  useEffect(() => {
    if(!getValues("email")) {
      get<GetUserResponse>('/api/settings/get-user', token).then((data) => {
        setValue('email', data.email || '')
      })
    }
  })

  return (
    <>
      <h3 className="pt-3">Change Email</h3>
      <form className="grid grid-cols-1 py-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.email?.message}</p>
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