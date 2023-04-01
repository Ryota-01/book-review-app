import React from 'react';
import Header from './Header';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { signIn } from '../userSlice'
import { url } from "../Url";
import axios from 'axios';
import '../css/Login.scss';


function Login() {
  const user = useSelector((state) => state.user.isSignIn)
  const dispatch = useDispatch();
  const navigate = useNavigate('')
  const {register, handleSubmit, formState: { errors }} = useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies()

  const onSubmit = (e) => {
      axios.post(`${url}/signin`, {email: e.email, password: e.password})
      .then((res) => {
        setCookie("token", res.data.token)
        dispatch(signIn())
        navigate('/home')
      })
      .catch((err) => {
        console.log(err.response.data)
        setErrorMessage(err.response.data.ErrorMessageJP)
      })
  }

  return (
    <>
      <Header />
      <div className='container'>
        <p className='head-text'>ログイン</p>

        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li className='input-area'>
              <label htmlFor="e-mail">e-mail</label>
              <input
                className='email-area'
                {...register('email', {required: '*メールアドレスを入力してください'})}
                type="email"
              />
                {errors.email?.message && <p className='required-errmsg'>{errors.email.message}</p>}
            </li>

            <li className='input-area'>
              <label htmlFor="password">パスワード</label>
              <input
                className='password-area'
                {...register('password', {
                  required: {
                    value: true,
                    message: '*パスワードを入力してください'
                },
                minLength: {
                  value: 5,
                  message: '*パスワードは5文字以上入力してください'
                }
              })}
                type="password"
              />
                {errors.password?.message && <p className='required-errmsg'>{errors.password.message}</p>}
            </li>
          </ul>
          <p className='failure-msg'>{errorMessage}</p>
          <p><button className='send-btn'>ログイン</button></p>
        </form>

        <p className='go-to-signup'>
          ユーザー登録は<Link to="/signup" >こちら</Link>
        </p>

      </div>
    </>
  )
}

export default Login