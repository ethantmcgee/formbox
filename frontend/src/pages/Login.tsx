import {useEffect, useState, useCallback} from 'react'
import logo from '../assets/img/logo.png'
import UsernamePassword from '../components/login/UsernamePassword'
import ForgotPassword from '../components/login/ForgotPassword'
import Mfa from '../components/login/MFA'
import ChangePassword from '../components/login/ChangePassword'
import { useSearchParams } from 'react-router-dom';

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();

  const USERNAME_PASSWORD = 0;
  const FORGOT_PASSWORD = 1;
  const MFA = 2;
  const CHANGE_PASSWORD = 3;

  const goHome = useCallback(() => {
    setSearchParams({});
    setPage(USERNAME_PASSWORD);
    }, [setSearchParams])

  const goToForgotPassword = () => {
    setPage(FORGOT_PASSWORD);
  }

  const goToMFA = (mfaCode: string) => {
    setMfaCode(mfaCode);
    setPage(MFA);
  }

  const goToChangePassword = (passwordChangeCode: string) => {
    setPasswordChangeCode(passwordChangeCode);
    setPage(CHANGE_PASSWORD);
  }

  const [page, setPage] = useState(USERNAME_PASSWORD);
  const [form, setForm] = useState(<UsernamePassword goToForgotPassword={goToForgotPassword} goToMFA={goToMFA} goToChangePassword={goToChangePassword} />);
  const [mfaCode, setMfaCode] = useState('');
  const [passwordChangeCode, setPasswordChangeCode] = useState('');

  useEffect(() => {
    const changeCode = searchParams.get("passwordChangeCode");
    if(changeCode) {
      setPasswordChangeCode(changeCode);
      setForm(<ChangePassword passwordChangeCode={passwordChangeCode} goHome={goHome} />)
    } else if(page === USERNAME_PASSWORD) {
      setForm(<UsernamePassword goToForgotPassword={goToForgotPassword} goToMFA={goToMFA} goToChangePassword={goToChangePassword} />)
    } else if(page === FORGOT_PASSWORD) {
      setForm(<ForgotPassword goHome={goHome} />)
    } else if(page === MFA) {
      setForm(<Mfa mfaCode={mfaCode} goHome={goHome} goToChangePassword={goToChangePassword} />)
    } else if(page === CHANGE_PASSWORD) {
      setForm(<ChangePassword passwordChangeCode={passwordChangeCode} goHome={goHome} />)
    } else {
      setForm(<></>)
    }
  }, [page, setForm, mfaCode, passwordChangeCode, searchParams, goHome])

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