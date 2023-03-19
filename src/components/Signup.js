import React from 'react'
import { useRef } from 'react'
import { useCookies } from "react-cookie";
import axios from 'axios'
import Header from './Header'
import '../css/Signup.scss'

function Signup() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [cookies, setCookie, removeCookie] = useCookies('')
  const onSignUp = () => {
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value  
    }
    axios.post('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users',data)
    .then((res) => {
      const token = res.data.token;
      console.log(res);
    })
    .then((error) => {
      console.log(error);
    })
  

  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(nameRef.current.value);
  //   console.log(emailRef.current.value);
  //   console.log(passwordRef.current.value);
  // }


  return (
    <>
      <Header />
      <div className='container'>
        <p className='head-text'>Signup</p>
        <form className='signup-form' >
          <label>name</label>
          <input className='name-area' name="name" type="text" ref={nameRef}/><br />
          <label>e-mail</label>
          <input className='email-area' name="email" type="email" ref={emailRef} /><br />
          <label>password</label>
          <input className='password-area' name="password" type="password" ref={passwordRef} />
          <p><button className='send-btn' onClick={onSignUp}>send</button></p>
        </form>
      </div>
    </>
  )
}

export default Signup