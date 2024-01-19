import { useState } from 'react';

type Properties = {
  goToForgotPassword: () => void
  sendUsernamePassword: (arg0: string, arg1: string) => void
}

export default function UsernamePassword({ goToForgotPassword, sendUsernamePassword }: Properties) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); sendUsernamePassword(username, password)}}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Username / Email Address
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="text-sm">
            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => goToForgotPassword()}>
              Forgot password?
            </button>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {e.preventDefault(); sendUsernamePassword(username, password)}}
          >
          Sign In
        </button>
      </div>
    </form>
  );
}