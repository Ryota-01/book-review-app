import React from 'react'
import "../css/Header.scss"
import { useState } from 'react'
import { url } from "../Url";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../userSlice'
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../img/user-regular.svg';

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

  const signup = () => {
    navigate('/signup')
  }

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
      <header className='header'>
        <div className='header__wrapper'>

          <div className='header__wrapper__left'>
            <h1 className='header__wrapper__heading'>Book Review App</h1>
          </div>

          <div className='header__wrapper__right'>

            <div className='header__wrapper__right__user-info'>
              {user ?
                <div className='header__user-name'>
                  <img className='user-icon' src={userIcon} />
                  <p>ようこそ、{userName} さん</p>
                </div> : <></>
              }
              {user ?
                <p className='header__user-name'><Link to='/useredit'>ユーザー情報を編集</Link></p> : <></>
              }
            </div>

            {user ? 
              <></> : 
              <button
                className='header__wrapper__signup-btn'
                onClick={signup}
              >
                新規会員登録
              </button>
            }
            
            {user ? 
              <button
                className='header__wrapper__logout-login-btn'
                onClick={logout}
              >
                ログアウト
              </button> : 
              <button
                className='header__wrapper__logout-login-btn'
                onClick={login}
              >
                ログイン
              </button>
            }
          </div>
        </div>

      </header>
    </>
  )
}

export default Header