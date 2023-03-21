import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';

function Signup() {
  const user = useSelector((state) => state.user.isSignIn)
  const dispatch = useDispatch();
  const navigate = useNavigate('')
  const [errorMessage, setErrorMessage] = useState('')
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const [cookies, setCookie, removeCookie] = useCookies()
  const url = process.env.REACT_APP_API_URL;

  const onSubmit = (e) => {
    const data = ({
      name: e.name,
      email: e.email,
      password: e.password
    })

    axios.post(`${url}/users`, data)
    .then((res) => {
      const token = res.data.token;
      setCookie("token", token);
      dispatch(signIn());
      console.log(res.data.token);
      navigate('/login');
    })
    .catch((err) => {
      setErrorMessage('ユーザー登録に失敗しました')
    })
    if(user) return <Navigate to="/" />
  };

  return (
    <>
      <Header />
      <div className='container'>
        <p className='head-text'>Signup</p>

        <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li className='input-area'>
              <label>お名前</label>
              <input
                className='name-area'
                {...register('name', {required: 'お名前は入力必須項目です' })}
                type="text"
                placeholder="必須"
                />
                {errors.name?.message && <p className='required-errmsg'>{errors.name.message}</p>}
              <br />
            </li>

            <li className='input-area'>
              <label>e-mail</label>
              <input
                className='email-area'
                {...register('email', {required: 'e-mailは入力必須項目です' })}
                type="email"
                placeholder="example@email.jp"
              />
                {errors.email?.message && <p className='required-errmsg'>{errors.email.message}</p>}
              <br />
            </li>

            <li className='input-area'>
              <label>パスワード</label>
              <input
                className='password-area'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'パスワードは入力必須項目です'
                  },
                  minLength: {
                    value: 5,
                    message: 'パスワードは5文字以上入力してください'
                  }
                })}
                type="password"
                placeholder="必須"
              />
                {errors.password?.message && <p className='required-errmsg'>{errors.password.message}</p>}
              <br />
            </li>

            <li className='input-area'>
              <label>アイコン画像(png,jpg)</label>
              <input
                className='fileupload-area'
                {...register('file', {required: 'アイコン画像をアップロードしてください' })}
                type="file"
                accept=".png, .jpg"
              />
                {errors.file?.message && <p className='required-errmsg'>{errors.file.message}</p>}
            </li>
            <p>{errorMessage}</p>
            <p><button className='send-btn'>signup</button></p>
          </ul>
        </form>
        <Link to="/login">
          ログインへ
        </Link>
      </div>
    </>
  )
}

export default Signup