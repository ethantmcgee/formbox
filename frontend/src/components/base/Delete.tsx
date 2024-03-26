type Properties = {
  goToTable: () => void,
  doDelete: () => void,
}

export default function Delete({ goToTable, doDelete }: Properties) {
  return (
    <>
      <p>Are you sure you want to do this?  This cannot be undone.</p>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToTable()}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => doDelete()}
        >
          Delete
        </button>
      </div>
    </>
  )
}