import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../features/auth/authSlice'
import AuthGuard from '../components/AuthGuard'

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  })

  return (
    <AuthGuard/>
  );
}