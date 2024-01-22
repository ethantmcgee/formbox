import { useCallback, useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router'
import {selectToken, setAuthToken, setRefreshToken} from '../../features/auth/authSlice'
import {post} from '../../authenticated-fetch'
import {AuthenticationState, LoginResponse, TwoFactorOption} from '../../types'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Properties = {
  mfaCode: string,
  goHome: () => void,
  goToChangePassword: (arg0: string) => void
}

const schema = yup.object({
  code: yup.string().required()
}).required();

export default function Mfa({ mfaCode, goHome, goToChangePassword }: Properties) {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mfaMethods, setMfaMethods] = useState<TwoFactorOption[]>([])

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback((data: { code: string }) => {
    
  }, []);

  useEffect(() => {
    
  }, []);
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Code
        </label>
        <div className="mt-2">
          <input
            {...register("code")}
            type="text"
            autoComplete="code"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p className="text-red-600">{errors.code?.message}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="w-1/3 rounded-md bg-indigo-600 px-3 py-1.5 mr-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {e.preventDefault(); goHome()}}
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
  );
}