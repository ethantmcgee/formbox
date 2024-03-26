import {TwoFactorOption} from '../../dto';
import MFAForm from './MFAForm';
import MFATable from './MFATable';
import DeleteMFA from './DeleteMFA';
import Manager from '../base/Manager';

export default function ManageForms() {
  const getListing = (
    goToAdd: () => void,
    goToView: (arg0: TwoFactorOption) => void,
    goToEdit: (arg0: TwoFactorOption) => void,
    goToDelete: (arg0: TwoFactorOption) => void
  ) => {
    return (
      <MFATable goToAdd={goToAdd} goToDelete={goToDelete} />
    )
  }

  const getAdd = (
    goToTable: () => void,
    goToView: (arg0: TwoFactorOption) => void
  ) => {
    return (
      <MFAForm goToTable={goToTable} />
    )
  }

  const getDelete = (
    entity: TwoFactorOption,
    goToTable: () => void
  ) => {
    return (
      <DeleteMFA goToTable={goToTable} mfaToBeDeleted={entity} />
    )
  }

  return (
    <Manager getListing={getListing} getAdd={getAdd} getDelete={getDelete}/>
  )
}