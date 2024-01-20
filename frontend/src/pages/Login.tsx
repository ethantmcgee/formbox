import {useEffect, useState, useCallback} from 'react'
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router'
import {selectToken, setAuthToken, setRefreshToken} from '../features/auth/authSlice'
import {post} from '../authenticated-fetch'
import {AuthenticationState, LoginResponse} from '../types'
import logo from '../assets/img/logo.png'
import UsernamePassword from '../components/login/UsernamePassword'
import ForgotPassword from '../components/login/ForgotPassword'

export default function Login() {
  const token = useSelector(selectToken)

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

  const goToMFA = () => {
    setPage(MFA);
  }

  const goToChangePassword = () => {
    setPage(CHANGE_PASSWORD);
  }

  const sendUsernamePassword = useCallback((username: string, password: string) => {
    post<LoginResponse>("/api/auth/login",{
      username,
      password
    }, token).then((data) => {
      if(data.state === AuthenticationState.SUCCESS) {
        dispatch(setAuthToken(data.authToken))
        dispatch(setRefreshToken(data.refreshToken))
        navigate("/")
      } else if(data.state === AuthenticationState.MFA_NEEDED) {
        // moar auth needed
        goToMFA();
      } else if(data.state === AuthenticationState.PASSWORD_CHANGE_REQUIRED) {
        // moar auth needed
        goToChangePassword();
      } else {
        toast.error("Login failed. Please try again");
      }
    });
  }, [dispatch, navigate, token]);

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
  }, [page, setForm, sendUsernamePassword])

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