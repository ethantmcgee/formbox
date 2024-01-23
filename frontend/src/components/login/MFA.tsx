import { useCallback, useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router'
import {selectToken, setAuthToken, setRefreshToken} from '../../features/auth/authSlice'
import {post} from '../../authenticated-fetch'
import {AuthenticationState, LoginResponse, MFAOption} from '../../types'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Properties = {
  mfaCode: string,
  goHome: () => void,
  goToChangePassword: (arg0: string) => void
}

const schema = yup.object({
  method: yup.number().required(),
  code: yup.string().required()
}).required();

export default function Mfa({ mfaCode, goHome, goToChangePassword }: Properties) {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mfaMethods, setMfaMethods] = useState<MFAOption[]>([])

  const { getValues, watch, register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const getSelectedOption = (selectedId: number | null) => {
    if(selectedId) {
      return mfaMethods.find(x => `${x.id}` === `${selectedId}`);
    }
    return null;
  }

  const onSubmit = useCallback((data: { method: number, code: string }) => {
    post<LoginResponse>("/api/auth/complete-mfa", {
      twoFactorAuthToken: mfaCode,
      twoFactorMethod: data.method,
      code: data.code
    }, token).then((resp) => {
      if(resp.state === AuthenticationState.SUCCESS) {
        dispatch(setAuthToken(resp.authToken))
        dispatch(setRefreshToken(resp.refreshToken))
        navigate("/")
      } else if(resp.state === AuthenticationState.PASSWORD_CHANGE_REQUIRED) {
        goToChangePassword(resp.passwordResetToken || '');
      }
    });
  }, []);

  const sendCode = useCallback(() => {
    post<LoginResponse>("/api/auth/start-mfa", {
      twoFactorAuthToken: mfaCode,
      twoFactorMethod: getValues("method")
    }, token).then((data) => {
      if(data.state === AuthenticationState.SUCCESS) {
        toast.success("Code Sent");
      } else {
        toast.success(data.state);
        goHome();
      }
    });
  }, []);

  useEffect(() => {
    post<MFAOption[]>("/api/auth/get-mfa-options", {
      twoFactorAuthToken: mfaCode,
    }, token).then((data) => {
      setMfaMethods(data);
    });
  }, []);
  
  const selected = getSelectedOption(watch("method"));
  const showSendCode = selected?.type === 'EMAIL' || selected?.type === 'SMS' ? (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => sendCode()}>
        Send Code
      </button>
    </div>
  ) : (<></>)

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="twoFactorType" className="block text-sm font-medium leading-6 text-gray-900">
          MFA Method
        </label>
        <div className="mt-2">
          <select
            {...register("method")}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            <option value="0">-</option>
            {(mfaMethods.map((method) => {
              return (
                <option value={method.id || 0} key={method.id || 0}>{method.nickname} - {method.preview}</option>
              );
            }))}
          </select>
          <p className="text-red-600">{errors.method?.message}</p>
        </div>
      </div>
      {showSendCode}
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