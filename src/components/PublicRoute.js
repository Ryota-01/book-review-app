import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'
import Login from './Login'

function PublicRoute(props) {
  const { children } = props;
  const navigate = useNavigate('')
  const user = useSelector((state) => state.user.isSignIn)

  if(user) {
    return <Navigate to='/home' />
  }

  return (
    <>
      {children}
    </>
  )

}

export default PublicRoute