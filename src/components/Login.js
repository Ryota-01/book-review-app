import React from 'react';
import Header from './Header';
import '../css/Login.scss';

function Login() {
  return (
    <>
      <Header />
      <div className='container'>
        <p>Login</p>
        <form className='login-form'>
          <label>ID</label>
          <input className='id-area' name="id" type="text" /><br />
          <label>e-mail</label>
          <input className='email-area' name="email" type="email" />
          <p><button className='send-btn'>send</button></p>
        </form>
      </div>
    </>
  )
}

export default Login