import {useState, useEffect} from 'react';
import {TwoFactorOption} from '../../dto';
import MFAForm from './MFAForm';
import MFATable from './MFATable';
import DeleteMFA from './DeleteMFA';

export default function ManageMFA() {
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [mfaToBeDeleted, setMfaToBeDeleted] = useState({} as TwoFactorOption)
  
  const goToAdd = () => {
    setAdding(true);
  }
  
  const goToDelete = (toBeDeleted: TwoFactorOption) => {
    setMfaToBeDeleted(toBeDeleted);
    setDeleting(true);
  }
  
  const goToTable = () => {
    setAdding(false);
    setDeleting(false);
  }
  
  const [shown, setShown] = useState(<MFATable goToAdd={goToAdd} goToDelete={goToDelete} />)
  
  useEffect(() => {
    if(adding) {
      setShown(<MFAForm goToTable={goToTable} />)
    } else if (deleting) {
      setShown(<DeleteMFA goToTable={goToTable} mfaToBeDeleted={mfaToBeDeleted} />)
    } else {
      setShown(<MFATable goToAdd={goToAdd} goToDelete={goToDelete} />)
    }
  }, [adding, deleting, mfaToBeDeleted, setShown])
  
  return (
    <>
     {shown}
    </>
  )
}