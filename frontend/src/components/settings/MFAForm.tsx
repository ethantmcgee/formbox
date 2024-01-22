import { useState, useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import { TwoFactorOption, TwoFactorSaveState } from '../../types';
import { post } from '../../authenticated-fetch'
import QRCode from "react-qr-code";
import {toast} from 'react-toastify';
// @ts-ignore
import * as TOTP from "totp.js";
import {Buffer} from 'buffer';
// @ts-ignore
window.Buffer = window.Buffer || Buffer;

type Properties = {
  goToTable: () => void
}

const schema = yup.object({
  id: yup.number(),
  secret: yup.string(),
  nickname: yup.string().required(),
  target: yup.string(),
  twoFactorType: yup.string().required(),
  code: yup.string().required()
}).required();

export default function MFAForm({ goToTable }: Properties) {
  const token = useSelector(selectToken)

  const { setValue, getValues, watch, register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0
    }
  });

  const [secret, setSecret] = useState('');
  const [restOfForm, setRestOfForm] = useState(<></>);
  const [code, setCode] = useState(<></>);

  const sendCode = useCallback(() => {
    post<TwoFactorOption>('/api/settings/save-mfa', {
      id: getValues("id"),
      secret: getValues("secret"),
      nickname: getValues("nickname"),
      target: getValues("target"),
      twoFactorType: getValues("twoFactorType"),
      active: false
    }, token).then((data) => {
      if(data.state === TwoFactorSaveState.SUCCESS) {
        toast.success("Sent Code");
      } else {
        toast.error(data.state);
      }
    })
  }, [token, getValues]);

  const onSubmit = useCallback((data: any) => {
    post<TwoFactorOption>('/api/settings/save-mfa', {
      id: data.id,
      secret: data.secret,
      nickname: data.nickname,
      target: data.target,
      twoFactorType: data.twoFactorType,
      code: data.code,
      active: true
    }, token).then((data) => {
      if(data.state === TwoFactorSaveState.SUCCESS) {
        toast.success("Successfully Saved");
        goToTable()
      } else {
        toast.error(data.state);
      }
    })
  }, [token, goToTable]);

  const type = watch("twoFactorType");
  useEffect(() => {
    if (type === "TOTP") {
      if(secret.length <= 6) {
        const key = TOTP.randomKey();
        setSecret(key);
        setValue("secret", key)
      }
      setRestOfForm(
        <>
          <p className="py-3">
            Use an application on your mobile device to scan the QR Code below to receive a two-factor authentication code. Enter the code to confirm
            that 2FA was successfully enabled on your mobile device. We recommend using cloud-based apps such as:
          <a className="mx-1.5 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10" href="https://support.1password.com/one-time-passwords/">1Password</a>
          <a className="mx-1.5 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10" href="https://authy.com/guides/github/">Authy</a>
          <a className="mx-1.5 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10" href="https://support.logmeininc.com/lastpass/help/lastpass-authenticator-lp030014">LastPass Authenticator</a>
          <a className="mx-1.5 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10" href="https://www.microsoft.com/en-us/account/authenticator/">Microsoft Authenticator</a>
          </p>
          <div className="flex justify-center">
            <div className="text-center">
              <QRCode value={secret || ''} />
              <p>Secret: {secret}</p>
            </div>
          </div>
        </>
      )
    } else if (type === "EMAIL") {
      if(secret.length > 6 || secret.length === 0) {
        const key = `${Math.floor(Math.random() * 999999)}`.padStart(6, '0');
        setSecret(key);
        setValue("secret", key)
      }
      setRestOfForm(
        <>
          <p className="py-3">
            Use your email to receive a two-factor authentication code. Enter the code received to confirm that the email belongs to you.
          </p>
          <div className="py-1.5">
            <label htmlFor="target" className="block text-sm font-medium leading-6 text-gray-900">
              E-Mail Address
            </label>
            <div className="mt-2">
              <input
                {...register("target")}
                type="text"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">{errors.target?.message}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => sendCode()}>
              Send Code
            </button>
          </div>
        </>
      )
    } else if (type === "SMS") {
      setRestOfForm(
        <>
          <p className="py-3">
            Use your mobile device to receive a two-factor authentication code. Enter the code received to confirm that the phone number belongs to you.
            (Standard messaging rates apply.)
          </p>
          <div className="py-1.5">
            <label htmlFor="target" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                {...register("target")}
                type="text"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">{errors.target?.message}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => sendCode()}>
              Send Code
            </button>
          </div>
        </>
      )
    }
    if(type) {
      setCode(
        <div className="py-1.5">
          <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
            Code
          </label>
          <div className="mt-2">
            <input
              {...register("code")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.code?.message}</p>
          </div>
        </div>
      );
    }
  }, [type, secret, errors.code?.message, errors.target?.message, register, sendCode, setValue])

  return (
    <>
      <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="invisible">
          <input type="number" {...register("id")}/>
          <input type="text" {...register("secret")}/>
        </div>
        <div className="py-1.5">
          <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
            Nickname
          </label>
          <div className="mt-2">
            <input
              {...register("nickname")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.nickname?.message}</p>
          </div>
        </div>
        <div className="py-1.5">
          <label htmlFor="twoFactorType" className="block text-sm font-medium leading-6 text-gray-900">
            Multi-Factor Authentication Type
          </label>
          <div className="mt-2">
            <select
              {...register("twoFactorType")}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <option value="">-</option>
              <option value="TOTP">Time-Based One Time Password (recommended)</option>
              <option value="SMS">SMS Message</option>
              <option value="EMAIL">E-Mail</option>
            </select>
            <p className="text-red-600">{errors.twoFactorType?.message}</p>
          </div>
        </div>

        {restOfForm}
        {code}

        <div className="mt-6 flex items-center justify-end gap-x-6">
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