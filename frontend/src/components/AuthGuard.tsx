import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { selectToken } from '../features/auth/authSlice'

type Props = {
  children?: ReactNode
}

export default function AuthGuard({children} : Props) {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token]);
  
  if(!token) {
    return (<div></div>)
  } else {
    return (
      <div>
        {children}
      </div>
    ) 
  }
}