import React from 'react';
import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { signIn } from '../userSlice'
import { url } from "../Url";
import axios from 'axios';
import '../css/Login.scss';


function Login(props) {
  console.log(props)
  const dispatch = useDispatch();
  const navigate = useNavigate('')
  const { axiosInstance } = props;
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ cookies, setCookie, removeCookie ] = useCookies()

  const onSubmit = (e) => {
    axiosInstance.post('/signin', { email: e.email, password: e.password })
    .then((res) => {
      setCookie("token", res.data.token)
      dispatch(signIn())
      navigate('/home')
    })
    .catch((err) => { setErrorMessage(err.response.data.ErrorMessageJP) })
  }

  return (
    <>
      <Header />
      <div className='login__container'>
        <h2 className='login__container__title'>ログイン</h2>
        <form className='login__container__form' onSubmit={handleSubmit(onSubmit)}>
          <p>Book Review App会員の方</p>
          <p>ID（e-mail）とパスワードを入力してください</p>
          
          <ul className='login__container__form__list'>
            <li className='login__container__form__list-item'>
              <label htmlFor="e-mail">e-mail</label>
              <input
                className='login__container__form__list-item__email'
                {...register('email', {required: '*メールアドレスを入力してください'})}
                type="email"
              />
                {errors.email?.message && <p className='required-errmsg'>{errors.email.message}</p>}
            </li>

            <li className='login__container__form__list-item'>
              <label htmlFor="password">パスワード</label>
              <input
                className='login__container__form__list-item__password'
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
          <button className='login__container__login-btn'>ログイン</button>
        </form>

        <p className='login__container__signup'>
          ユーザー登録は<Link to="/signup" >こちら</Link>
        </p>

      </div>
    </>
  )
}

export default Login