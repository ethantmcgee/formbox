import {DeleteTwoFactorResponse, TwoFactorOption} from '../../dto';
import {DeleteTwoFactorState} from '../../enum'
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {del} from '../../authenticated-fetch'
import {toast} from 'react-toastify';
import Delete from '../base/Delete';

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
    <Delete goToTable={goToTable} doDelete={doDelete} />
  )
}