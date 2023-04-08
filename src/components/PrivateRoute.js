import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

function PrivateRoute(props) {
  const { children } = props;
  console.log(children)
  const user = useSelector((state) => state.user.isSignIn)

  if(!user) {
    alert('ログインしてください')
    return <Navigate to='/login' />;
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute