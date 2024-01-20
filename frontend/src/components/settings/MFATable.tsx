import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get} from '../../authenticated-fetch'
import { TwoFactorOption } from '../../types';

type Properties = {
  goToAdd: () => void,
  goToDelete: (arg0: TwoFactorOption) => void
}

export default function ManageMFA({ goToAdd, goToDelete }: Properties) {
  const token = useSelector(selectToken)
  const [mfaOptions, setMfaOptions] = useState([] as TwoFactorOption[]);
  
  useEffect(() => {
    get<TwoFactorOption[]>('/api/settings/mfa-options', token).then((data) => {
      setMfaOptions(data)
    })
  }, [token])
  
  return (
    <>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Multi-Factor Authentication</h1>
            <p className="mt-2 text-sm text-gray-700">
              Multi-Factor authentication (<strong>MFA</strong>) is an extra layer of security used when logging into websites or apps. With MFA, you must log in with your username and password and provide another form of authentication that only you know or have access to.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => goToAdd()}
              >
              Add MFA
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Target
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(mfaOptions).map((mfaOption) => {
                    return (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {mfaOption.nickname}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {mfaOption.twoFactorType}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {mfaOption.target}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                          <button type="button" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={() => goToDelete(mfaOption)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}