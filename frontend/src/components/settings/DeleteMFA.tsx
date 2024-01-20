import { TwoFactorOption } from '../../types';

type Properties = {
  goToTable: () => void,
  mfaToBeDeleted: TwoFactorOption | null
}

export default function DeleteMFA({ goToTable, mfaToBeDeleted }: Properties) {
  return (
    <>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToTable()}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Delete
        </button>
      </div>
    </>
  )
}