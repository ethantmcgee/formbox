import {useState, useEffect} from 'react';
import {ApiForm} from '../../types';
import FormView from './FormView';
import FormForm from './FormForm';
import FormsTable from './FormsTable';
import DeleteForm from './DeleteForm';

export default function ManageForms() {
  const [adding, setAdding] = useState(false)
  const [viewing, setViewing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formToBeViewed, setFormToBeViewed] = useState({} as ApiForm)
  const [formToBeEdited, setFormToBeEdited] = useState({} as ApiForm)
  const [formToBeDeleted, setFormToBeDeleted] = useState({} as ApiForm)

  const goToAdd = () => {
    setAdding(true);
  }
  
  const goToView = (toBeViewed: ApiForm) => {
    setFormToBeViewed(toBeViewed);
    setEditing(true);
  }
  
  const goToEdit = (toBeEdited: ApiForm) => {
    setFormToBeEdited(toBeEdited);
    setEditing(true);
  }

  const goToDelete = (toBeDeleted: ApiForm) => {
    setFormToBeDeleted(toBeDeleted);
    setDeleting(true);
  }

  const goToTable = () => {
    setAdding(false);
    setEditing(false);
    setDeleting(false);
  }

  const [shown, setShown] = useState(<FormsTable goToAdd={goToAdd} goToView={goToView} goToEdit={goToEdit} goToDelete={goToDelete} />)

  useEffect(() => {
    if(adding) {
      setShown(<FormForm goToTable={goToTable} goToView={goToView} formToBeEdited={null} />)
    } else if(viewing) {
      setShown(<FormView goToTable={goToTable} goToEdit={goToEdit} formToBeViewed={formToBeEdited} />)
    } else if(editing) {
      setShown(<FormForm goToTable={goToTable} goToView={goToView} formToBeEdited={formToBeEdited} />)
    } else if (deleting) {
      setShown(<DeleteForm goToTable={goToTable} formToBeDeleted={formToBeDeleted} />)
    } else {
      setShown(<FormsTable goToAdd={goToAdd} goToView={goToView} goToEdit={goToEdit} goToDelete={goToDelete} />)
    }
  }, [adding, editing, deleting, formToBeEdited, formToBeDeleted, setShown])

  return (
    <>
      {shown}
    </>
  )
}