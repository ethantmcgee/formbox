import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setAuthToken, setRefreshToken } from '../features/auth/authSlice'
import logo from '../assets/img/logo.png'
import UsernamePassword from '../components/UsernamePassword'
import ForgotPassword from '../components/ForgotPassword'

export default function App() {
  const USERNAME_PASSWORD = 0;
  const FORGOT_PASSWORD = 1;
  const MFA = 2;
  const CHANGE_PASSWORD = 3;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goHome = () => {
    setPage(USERNAME_PASSWORD);
  }

  const goToForgotPassword = () => {
    setPage(FORGOT_PASSWORD);
  }

  const sendUsernamePassword = (username: string, password: string) => {
    fetch("/api/auth/login",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.state === 'SUCCESS') {
        dispatch(setAuthToken(data.authToken))
        dispatch(setRefreshToken(data.refreshToken))
        navigate("/")
      } else if(data.state === 'MFA_NEEDED') {
        // moar auth needed
      } else if(data.state === 'PASSWORD_CHANGE_REQUIRED') {
        // moar auth needed
      } else {
        toast.error("Login failed. Please try again");
      }
    })
    .catch(() => {
      toast.error("Connection Error")
    });
  }

  const [page, setPage] = useState(USERNAME_PASSWORD);
  const [form, setForm] = useState(<UsernamePassword goToForgotPassword={goToForgotPassword} sendUsernamePassword={sendUsernamePassword} />);

  useEffect(() => {
    if(page === USERNAME_PASSWORD) {
      setForm(<UsernamePassword goToForgotPassword={goToForgotPassword} sendUsernamePassword={sendUsernamePassword} />)
    } else if(page === FORGOT_PASSWORD) {
      setForm(<ForgotPassword goHome={goHome} />)
    } else {
      setForm(<></>)
    }
  }, [page, setForm])

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