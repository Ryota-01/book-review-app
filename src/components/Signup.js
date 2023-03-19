import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import Header from './Header'
import '../css/Signup.scss'

function Signup() {
  const navigate = useNavigate('')
  const [errorMessage, setErrorMessage] = useState('')
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const [cookies, setCookie, removeCookie] = useCookies()
  const onSubmit = (data) => {console.log(data)}

  const onSignUp = (e) => {
    // e.preventDefault();
    // const data = ({
    //   name: nameRef.current.value,
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // })

    axios.post('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users')
    .then((res) => {
      const token = res.data.token;
      setCookie("token", token)
      navigate('/login');
    })
    .catch((err) => {
      setErrorMessage(err)
      console.log('error!');
    })
  };

  return (
    <>
      <Header />
      <div className='container'>
        <p className='head-text'>Signup</p>

        <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>

          <label>name</label>
          <input
            className='name-area'
            // {...register('name', {required: 'nameは入力必須項目です' })}
            type="text"
            placeholder="required"
            />
            {/* {alert(errors.name?.message)} */}
          <br />

          <label>e-mail</label>
          <input
            className='email-area'
            // {...register('email', {required: 'emailは入力必須項目です' })}
            type="email"
            placeholder="example@email.jp"
          />
            {/* {alert(errors.email?.message)} */}
          <br />

          <label>password</label>
          <input
            className='password-area'
            {...register('password', {
              required: {
                value: true,
                message: 'passwordは入力必須項目です'
              },
              minLength: {
                value: 5,
                message: '5文字以上入力してください'
              }
            })}
            type="password"
            placeholder="required"
          />

          <label>icon imag(png,jpg)</label>
          <input
            className='fileupload-area'
            {...register('file', {required: true })}
            type="file"
            accept=".png, .jpg"
          />

          <p><button className='send-btn'>send</button></p>
        </form>
      </div>
    </>
  )
}

export default Signup