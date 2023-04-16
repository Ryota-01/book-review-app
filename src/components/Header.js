import React, { useEffect } from 'react'
import "../css/Header.scss"
import { useState } from 'react'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../userSlice'
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../img/user-regular.svg';

function Header(props) {
  const user = useSelector((state) => state.user.isSignIn)
  const dispatch = useDispatch('')
  const navigate = useNavigate('')
  const [userName, setUserName] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies('')
  const axiosInstance = axios.create({
    baseURL :  'https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/',
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    }
  })

  axiosInstance.get('/users')
  .then((res) => { setUserName(res.data.name) })
  .catch((err) => { console.log(err) })  

  //ログアウト処理
  const logout = () => {
    dispatch(signOut())
    navigate('/login')
    removeCookie('token')
  }

  //ログイン画面へ遷移
  const login = () => { navigate('/login') }

  //サインアップ画面へ遷移
  const signup = () => { navigate('/signup') }
  
  return (
    <>
      <header className='header'>
        <div className='header__wrapper'>
          <div className='header__wrapper__left'>
            <h1 className='header__wrapper__heading'>Book Review App</h1>
          </div>
          <div className='header__wrapper__right'>
            <div className='header__wrapper__right__user-info'>
              { user ?
                <div className='header__user-name'>
                  <img className='user-icon' src={userIcon} />
                  <p>ようこそ、{userName} さん</p>
                </div> : <></> }
              { user ? <p className='header__user-name'><Link to='/profile'>ユーザー情報を編集</Link></p> : <></> }
            </div>

            { user ? <></> : 
              <button
                className='header__wrapper__signup-btn'
                onClick={signup}
              >
                新規会員登録
              </button>
            }
            
            { user ? 
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