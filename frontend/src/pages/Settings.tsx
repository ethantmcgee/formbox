import React from 'react';
import AuthGuard from '../components/AuthGuard'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function App() {
  return (
    <AuthGuard>
      <div className="container">
        <form>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
      </div>
    </AuthGuard>
  );
}