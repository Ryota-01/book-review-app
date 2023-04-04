import React from 'react'
import "../css/Header.scss"
import { useState } from 'react'
import { url } from "../Url";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../userSlice'
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const user = useSelector((state) => state.user.isSignIn)
  const dispatch = useDispatch('')
  const navigate = useNavigate('')
  const [userName, setUserName] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies('')

  const logout = () => {
    dispatch(signOut())
    removeCookie('token')
    navigate('/login')
  }

  const login = () => {
    navigate('/login');
  }

  axios.get(`${url}users`, {
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    },
  })
  .then((res) => {
    console.log(res)
    setUserName(res.data.name)
  })
  .catch((err) => {
    console.log(err)
  })

  axios.get(`${url}users`, {
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    },
  })
  .then((res) => {
    setUserName(res.data.name)
  })
  .catch((err) => {
    console.log(err)
  })
  
  return (
    <>
    <header>
      <h1>
        <p>Book Review App</p>
      </h1>

      {user ? 
        <p>ようこそ {userName} さん</p> : <></>
      }

      {user ? 
        <button onClick={logout}>ログアウト</button> : <button onClick={login}>ログイン</button>
      }

    </header>
    </>
  )
}

export default Header