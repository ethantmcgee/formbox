import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {del} from '../../authenticated-fetch'
import {toast} from 'react-toastify';
import {ApiForm} from '../../dto';
import Delete from '../base/Delete';

type Properties = {
  goToTable: () => void,
  formToBeDeleted: ApiForm | null
}

export default function DeleteForm({ goToTable, formToBeDeleted }: Properties) {
  const token = useSelector(selectToken)

  const doDelete = () => {
    del<ApiForm>('/api/forms/', formToBeDeleted, token).then((data) => {
      toast.success("Form Deleted")
      goToTable()
    })
  }

  return (
    <Delete goToTable={goToTable} doDelete={doDelete} />
  )
}