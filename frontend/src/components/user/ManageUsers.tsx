import {useState, useEffect} from 'react';
import {ApiUser} from '../../types';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import DeleteUser from './DeleteUser';

export default function ManageUsers() {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [userToBeEdited, setUserToBeEdited] = useState({} as ApiUser)
  const [userToBeDeleted, setUserToBeDeleted] = useState({} as ApiUser)

  const goToAdd = () => {
    setAdding(true);
  }
  
  const goToEdit = (toBeEdited: ApiUser) => {
    setUserToBeEdited(toBeEdited);
    setEditing(true);
  }

  const goToDelete = (toBeDeleted: ApiUser) => {
    setUserToBeDeleted(toBeDeleted);
    setDeleting(true);
  }

  const goToTable = () => {
    setAdding(false);
    setEditing(false);
    setDeleting(false);
  }

  const [shown, setShown] = useState(<UsersTable goToAdd={goToAdd} goToEdit={goToEdit} goToDelete={goToDelete} />)

  useEffect(() => {
    if(adding) {
      setShown(<UserForm goToTable={goToTable} userToBeEdited={null} />)
    } else if(editing) {
      setShown(<UserForm goToTable={goToTable} userToBeEdited={userToBeEdited} />)
    } else if (deleting) {
      setShown(<DeleteUser goToTable={goToTable} userToBeDeleted={userToBeDeleted} />)
    } else {
      setShown(<UsersTable goToAdd={goToAdd} goToEdit={goToEdit} goToDelete={goToDelete} />)
    }
  }, [adding, editing, deleting, userToBeEdited, userToBeDeleted, setShown])

  return (
    <>
      {shown}
    </>
  )
}