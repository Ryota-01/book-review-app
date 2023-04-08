import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

function PublicRoute(props) {
  const { children } = props;
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