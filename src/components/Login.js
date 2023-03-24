import React from 'react';
import Header from './Header';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { signIn } from '../userSlice'
import axios from 'axios';

function Login() {
  const user = useSelector((state) => state.user.isSignIn)
  const dispatch = useDispatch();
  const navigate = useNavigate('')
  const {register, handleSubmit, formState: { errors }} = useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies()
  const url = process.env.REACT_APP_API_URL;

  const onSubmit = (e) => {
      const data = ({
        email: e.email,
        password: e.password
      })

      axios.post(`${url}/signin`, data)
      .then((res) => {
        setCookie("token", res.data.token)
        dispatch(signIn())
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(err.response.data.ErrorMessageJP)
      })
  }

  return (
    <>
      <Header />
      <div className='container'>
        <p>LOGIN</p>

        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>

          <ul>
            <li className='input-area'>
              <label htmlFor="e-mail">e-mail</label>
              <input
                className='email-area'
                {...register('email', {required: 'メールアドレスを入力してください'})}
                type="email"
              />
                {errors.email?.message && <p className='required-errmsg'>{errors.email.message}</p>}
            </li>

            <li className='input-area'>
              <label htmlFor="password">password</label>
              <input
                className='password-area'
                {...register('password', {required: 'パスワードを入力してください'})}
                type="password"
              />
                {errors.password?.message && <p className='required-errmsg'>{errors.password.message}</p>}
            </li>
          </ul>
          <p>{errorMessage}</p>
          <p><button className='send-btn'>login</button></p>
  
        </form>
        <p>ユーザー登録は<Link to="/signup" >こちら</Link></p>
      </div>
    </>
  )
}

export default Login