import {useState, useEffect, useCallback} from 'react';

type Properties<T> = {
  getListing: (goToAdd: () => void, goToView: (arg0: T) => void, goToEdit: (arg0: T) => void, goToDelete: (arg0: T) => void) => JSX.Element,
  getAdd: (goToTable: () => void, goToEdit: (arg0: T) => void) => JSX.Element,
  getView?: (entity: T, goToTable: () => void, goToView: (arg0: T) => void) => JSX.Element,
  getEdit?: (entity: T, goToTable: () => void, goToEdit: (arg0: T) => void) => JSX.Element,
  getDelete: (entity: T, goToTable: () => void) => JSX.Element,
}

export default function ManageForms<T>(
  {
    getListing,
    getAdd,
    getView = (entity: T, goToTable: () => void, goToView: (arg0: T) => void) => (<></>),
    getEdit = (entity: T, goToTable: () => void, goToEdit: (arg0: T) => void) => (<></>),
    getDelete
  }: Properties<T>
) {
  const [adding, setAdding] = useState(false)
  const [viewing, setViewing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [entityToBeViewed, setEntityToBeViewed] = useState({} as T)
  const [entityToBeEdited, setEntityToBeEdited] = useState({} as T)
  const [entityToBeDeleted, setEntityToBeDeleted] = useState({} as T)

  const goToAdd = useCallback(() => {
    setAdding(true);
  }, [setAdding]);

  const goToView = useCallback((toBeViewed: T) => {
    setEntityToBeViewed(toBeViewed);
    setViewing(true);
    setEditing(false);
  }, [setEntityToBeViewed, setViewing, setEditing])

  const goToEdit = useCallback((toBeEdited: T) => {
    setEntityToBeEdited(toBeEdited);
    setEditing(true);
    setViewing(false);
  }, [setEntityToBeEdited, setEditing, setViewing])

  const goToDelete = useCallback((toBeDeleted: T) => {
    setEntityToBeDeleted(toBeDeleted);
    setDeleting(true);
  }, [setEntityToBeDeleted, setDeleting])

  const goToTable = useCallback(() => {
    setAdding(false);
    setEditing(false);
    setDeleting(false);
  }, [setAdding, setEditing, setDeleting])

  const [shown, setShown] = useState(getListing(goToAdd, goToView, goToEdit, goToDelete))

  useEffect(() => {
    if(adding) {
      setShown(getAdd(goToTable, goToView))
    } else if(viewing) {
      setShown(getView(entityToBeViewed, goToTable, goToEdit))
    } else if(editing) {
      setShown(getEdit(entityToBeEdited, goToTable, goToView))
    } else if (deleting) {
      setShown(getDelete(entityToBeDeleted, goToTable))
    } else {
      setShown(getListing(goToAdd, goToView, goToEdit, goToDelete))
    }
  }, [adding, viewing, editing, deleting, entityToBeViewed, entityToBeEdited, entityToBeDeleted, setShown, getAdd, getDelete, getEdit, getListing, getView, goToAdd, goToDelete, goToEdit, goToView, goToTable])

  return (
    <>
      {shown}
    </>
  )
}