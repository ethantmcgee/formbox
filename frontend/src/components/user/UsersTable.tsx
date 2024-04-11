import {useState} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get} from '../../authenticated-fetch'
import {PageableApiUser, ApiUser} from '../../dto';
import {Pageable} from '../base/Table';
import Table from '../base/Table';

type Properties = {
  goToAdd: () => void,
  goToEdit: (arg0: ApiUser) => void,
  goToDelete: (arg0: ApiUser) => void,
}

export default function UsersTable({ goToAdd, goToEdit, goToDelete }: Properties) {
  const token = useSelector(selectToken)
  
  const doSearch = (search: string, page: number, itemsPerPage: number) => {
    return new Promise<Pageable<ApiUser>>((resolve, reject) => {
      get<PageableApiUser>(`/api/users?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`, token).then((data) => {
        resolve(data)
      })
    });
  }

  return (
    <>
      <div>
        <Table
          entityType="Users"
          description="Invite users to collaborate with you on forms."
          doSearch={doSearch}
          getIdentity={(x) => `${x.id}`}
          goToAdd={goToAdd}
          perPage={-1}
          columns={[{
            name: "Email",
            getValue: (e) => e.email
          }, {
            name: "Username",
            getValue: (e) => e.username
          }]}
          actions={[{
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