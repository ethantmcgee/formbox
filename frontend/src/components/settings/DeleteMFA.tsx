import {DeleteTwoFactorResponse, TwoFactorOption} from '../../dto';
import {DeleteTwoFactorState} from '../../enum'
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {del} from '../../authenticated-fetch'
import {toast} from 'react-toastify';

type Properties = {
  goToTable: () => void,
  mfaToBeDeleted: TwoFactorOption | null
}

export default function DeleteMFA({ goToTable, mfaToBeDeleted }: Properties) {
  const token = useSelector(selectToken)

  const doDelete = () => {
    del<DeleteTwoFactorResponse>('/api/settings/mfa', {id: mfaToBeDeleted?.id}, token).then((data) => {
      if(data.state === DeleteTwoFactorState.DELETE_TWO_FACTOR_SUCCESS) {
        toast.success("MFA Option Deleted")
        goToTable()
      } else {
        toast.error(data.state)
      }
    })
  }

  return (
    <>
      <p>Are you sure you want to do this?  Once deleted, this MFA option will have to be setup again, it cannot be recovered.</p>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToTable()}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => doDelete()}
          >
          Delete
        </button>
      </div>
    </>
  )
}