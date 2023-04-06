import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'

function PrivateRoute(props) {
  const { children } = props;
  console.log(children)
  const user = useSelector((state) => state.user.isSignIn)

  if(!user) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute