import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {del} from '../../authenticated-fetch'
import {toast} from 'react-toastify';
import {ApiUser} from '../../dto';
import Delete from '../base/Delete';

type Properties = {
  goToTable: () => void,
  userToBeDeleted: ApiUser | null
}

export default function DefaultUser({ goToTable, userToBeDeleted }: Properties) {
  const token = useSelector(selectToken)

  const doDelete = () => {
    del<ApiUser>('/api/users/', userToBeDeleted, token).then((data) => {
      toast.success("User Deleted")
      goToTable()
    })
  }

  return (
    <Delete goToTable={goToTable} doDelete={doDelete} />
  )
}