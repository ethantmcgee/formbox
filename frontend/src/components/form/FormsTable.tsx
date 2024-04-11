import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get} from '../../authenticated-fetch'
import {PageableApiForm, ApiForm} from '../../dto';
import {Pageable} from '../base/Table';
import Table from '../base/Table';

type Properties = {
  goToAdd: () => void,
  goToView: (arg0: ApiForm) => void,
  goToEdit: (arg0: ApiForm) => void,
  goToDelete: (arg0: ApiForm) => void,
}

export default function FormsTable({ goToAdd, goToView, goToEdit, goToDelete }: Properties) {
  const token = useSelector(selectToken)
  
  const doSearch = (search: string, page: number, itemsPerPage: number) => {
    return new Promise<Pageable<ApiForm>>((resolve, reject) => {
      get<PageableApiForm>(`/api/forms?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`, token).then((data) => {
        resolve(data)
      })
    })
  }

  return (
    <>
      <div>
        <Table
          entityType="Forms"
          description="Create forms to receive submissions.  Enable form protection and configure notification settings."
          doSearch={doSearch}
          getIdentity={(x) => `${x.id}`}
          goToAdd={goToAdd}
          perPage={-1}
          columns={[{
            name: "Name",
            getValue: (e) => e.name
          }, {
            name: "Slug",
            getValue: (e) => e.slug
          }]}
          actions={[{
            name: "View Submissions",
            performAction: (e) => goToView(e)
          },{
            name: "Edit",
            performAction: (e) => goToEdit(e)
          }, {
            name: "Delete",
            performAction: (e) => goToDelete(e)
          }]}
        />
      </div>
    </>
  )
}