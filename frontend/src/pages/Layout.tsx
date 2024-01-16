import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectToken } from '../features/auth/authSlice'

export default function Layout() {
  const token = useSelector(selectToken)
  
  let menu = (
    <ul></ul>
  );
  if(token) {
    menu = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    )
  }
  
  return (
    <>
      <nav>
        {menu}
      </nav>
  
      <Outlet />
    </>
  )
};