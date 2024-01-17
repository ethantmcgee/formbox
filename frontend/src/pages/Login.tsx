import { useState, useEffect } from 'react'
import logo from '../assets/img/logo.png'
import UsernamePassword from '../components/UsernamePassword'
import ForgotPassword from '../components/ForgotPassword'

export default function App() {
  const USERNAME_PASSWORD = 0;
  const FORGOT_PASSWORD = 1;
  const MFA = 2;
  const CHANGE_PASSWORD = 3;

  const [page, setPage] = useState(0);
  const [form, setForm] = useState(<UsernamePassword setPage={setPage} />);

  useEffect(() => {
    if(page === USERNAME_PASSWORD) {
      setForm(<UsernamePassword setPage={setPage} />)
    } else if(page === FORGOT_PASSWORD) {
      setForm(<ForgotPassword setPage={setPage} />)
    } else {
      setForm(<></>)
    }
  }, [page, form])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="FormBox.dev"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {form}
        </div>
      </div>
    </>
  );
}