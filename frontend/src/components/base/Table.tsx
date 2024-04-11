import {useState, useEffect} from 'react';

export type Pageable<T> = {
  results: T[]
  total: number
}

export type Column<T> = {
  name: string,
  getValue: (entity: T) => string
}

export type Action<T> = {
  name: string,
  performAction: (entity: T) => void
}

type Properties<T> = {
  entityType: string,
  description: string,
  getIdentity: (entity: T) => string
  columns: Column<T>[],
  actions: Action<T>[],
  doSearch: (search: string, page: number, itemsPerPage: number) => Promise<Pageable<T>>
  perPage: number,
  goToAdd: () => void,
}

export default function FormsTable<T>({ entityType, description, perPage, goToAdd, doSearch, getIdentity, columns, actions }: Properties<T>) {
  const [data, setData] = useState([] as T[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, ] = useState(-1);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    doSearch(search, page, itemsPerPage).then((data) => {
      setData(data.results)
      setTotal(data.total)
    })
  }, [doSearch, page, itemsPerPage, search])
  
  return (
    <>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Manage {entityType}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {description}
            </p>
          </div>
          <div className="flex mt-4 sm:ml-16 sm:mt-0 gap-x-3">
            <span className="py-1.5">
              Search:
            </span>
            <input
              type="text"
              autoComplete="search"
              className="block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => goToAdd()}
              >
              New
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {(columns).map((column) => {
                      return (
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          {column.name}
                        </th>
                      )
                    })}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(data).map((item) => {
                    return (
                      <tr key={getIdentity(item)}>
                        {(columns).map((column) => {
                          return (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {column.getValue(item)}
                            </td>
                          );
                        })}
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                          {(actions).map((action) => {
                            return (
                              <button type="button" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={() => action.performAction(item)}>
                                {action.name}
                              </button>
                              )
                          })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="mt-6 flex items-center justify-end gap-x-3">
                <button disabled={page === 1} type="button" className={"text-sm font-semibold leading-6 " + (page === 1 ? 'text-gray-300' : 'text-gray-900')} onClick={() => setPage(page - 1)}>
                  Previous
                </button>
                <p className="text-xs">
                  Showing {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, total)} of {total}
                </p>
                <button disabled={page * itemsPerPage > total} type="button" className={"text-sm font-semibold leading-6 " + (page * itemsPerPage > total ? 'text-gray-300' : 'text-gray-900')} onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}