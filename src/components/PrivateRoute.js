import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'

function PrivateRoute(props) {
  const { children } = props;
  const user = useSelector((state) => state.user.isSignIn)
  console.log(user)

  if(!user) {
    return <Navigate to='/login' />;
  }
  return <Home />
}

export default PrivateRoute