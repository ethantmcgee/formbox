import {ApiForm} from '../../dto';
import FormView from './FormView';
import FormForm from './FormForm';
import FormsTable from './FormsTable';
import DeleteForm from './DeleteForm';
import Manager from '../base/Manager';

export default function ManageForms() {
  const getListing = (
    goToAdd: () => void,
    goToView: (arg0: ApiForm) => void,
    goToEdit: (arg0: ApiForm) => void,
    goToDelete: (arg0: ApiForm) => void
  ) => {
    return (
      <FormsTable goToAdd={goToAdd} goToView={goToView} goToEdit={goToEdit} goToDelete={goToDelete} />
    )
  }

  const getAdd = (
    goToTable: () => void,
    goToView: (arg0: ApiForm) => void
  ) => {
    return (
      <FormForm goToTable={goToTable} goToView={goToView} formToBeEdited={null} />
    )
  }

  const getView = (
    entity: ApiForm,
    goToTable: () => void,
    goToEdit: (arg0: ApiForm) => void
  ) => {
    return (
      <FormView goToTable={goToTable} goToEdit={goToEdit} formToBeViewed={entity} />
    )
  }

  const getEdit = (
    entity: ApiForm,
    goToTable: () => void,
    goToView: (arg0: ApiForm) => void
  ) => {
    return (
      <FormForm goToTable={goToTable} goToView={goToView} formToBeEdited={entity} />
    )
  }

  const getDelete = (
    entity: ApiForm,
    goToTable: () => void
  ) => {
    return (
      <DeleteForm goToTable={goToTable} formToBeDeleted={entity} />
    )
  }

  return (
    <Manager getListing={getListing} getAdd={getAdd} getView={getView} getEdit={getEdit} getDelete={getDelete}/>
  )
}