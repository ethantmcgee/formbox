import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get} from '../../authenticated-fetch'
import {PageableApiUser, ApiUser} from '../../types';

type Properties = {
  goToAdd: () => void,
  goToEdit: (arg0: ApiUser) => void,
  goToDelete: (arg0: ApiUser) => void,
}

export default function UsersTable({ goToAdd, goToEdit, goToDelete }: Properties) {
  const token = useSelector(selectToken)
  const [users, setUsers] = useState([] as ApiUser[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, ] = useState(10);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    get<PageableApiUser>(`/api/users?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`, token).then((data) => {
      setUsers(data.results)
      setTotal(data.total || 0)
    })
  }, [token, page, itemsPerPage, search])

  return (
    <>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Manage Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              Invite users to collaborate with you on forms.
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
              Add User
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Username
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(users).map((user) => {
                    return (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.username}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                          <button type="button" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={() => goToEdit(user)}>
                            Edit
                          </button>
                          <button type="button" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={() => goToDelete(user)}>
                            Delete
                          </button>
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