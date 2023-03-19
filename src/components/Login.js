import React from 'react';
import Header from './Header';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Login() {
  const {register, handleSubmit, formState: { errors }} = useForm()
  const [cookies, setCookie, removeCookie] = useCookies()
  const onSubmit = (e) => {
      const data = ({
        email: e.email,
        password: e.password
      })

      axios.post('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin', data)
      .then((res) => {
        const token = res.data.token;
        setCookie("token", token)
      })
      .catch((err) => {
        console.log('error!')
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
              <label>e-mail</label>
              <input
                className='email-area'
                {...register('email', {required: 'メールアドレスを入力してください'})}
                type="email"
              />
                {errors.email?.message && <p className='required-errmsg'>{errors.email.message}</p>}
            </li>

            <li className='input-area'>
              <label>password</label>
              <input
                className='password-area'
                {...register('password', {required: 'パスワードを入力してください'})}
                type="password"
              />
                {errors.password?.message && <p className='required-errmsg'>{errors.password.message}</p>}
            </li>
          </ul>

          <p><button className='send-btn'>login</button></p>

        </form>
        <p>ユーザー登録は<Link to="/signup" >こちら</Link></p>
      </div>
    </>
  )
}

export default Login