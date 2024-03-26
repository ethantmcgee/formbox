import {ApiUser} from '../../dto';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import DeleteUser from './DeleteUser';
import Manager from '../base/Manager';

export default function ManageForms() {
  const getListing = (
    goToAdd: () => void,
    goToView: (arg0: ApiUser) => void,
    goToEdit: (arg0: ApiUser) => void,
    goToDelete: (arg0: ApiUser) => void
  ) => {
    return (
      <UsersTable goToAdd={goToAdd} goToEdit={goToEdit} goToDelete={goToDelete} />
    )
  }

  const getAdd = (
    goToTable: () => void,
    goToView: (arg0: ApiUser) => void
  ) => {
    return (
      <UserForm goToTable={goToTable} userToBeEdited={null} />
    )
  }

  const getEdit = (
    entity: ApiUser,
    goToTable: () => void,
    goToView: (arg0: ApiUser) => void
  ) => {
    return (
      <UserForm goToTable={goToTable} userToBeEdited={entity} />
    )
  }

  const getDelete = (
    entity: ApiUser,
    goToTable: () => void
  ) => {
    return (
      <DeleteUser goToTable={goToTable} userToBeDeleted={entity} />
    )
  }

  return (
    <Manager getListing={getListing} getAdd={getAdd} getEdit={getEdit} getDelete={getDelete}/>
  )
}