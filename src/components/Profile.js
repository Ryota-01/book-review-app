import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { url } from "../Url";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Header from './Header';
import '../css/Profile.scss';

function UserEdit() {
  const [cookies] = useCookies();
  const [currentUserName, setCurrentUserName] = useState('')
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const navigate = useNavigate('')

  const back = (e) => {
    return navigate('/home');
  }

  axios.get(`${url}/users`, {
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    },
  })
  .then((res) => {
    setCurrentUserName(res.data.name)
  })
  .catch((err) => {
    console.log(err)
  });


  const onUpdata = (e) => {
    if(window.confirm('ユーザー名を更新しますか？')) {

      const data = {
        name: e.name
      }
      axios.put(`${url}/users`, data, {
        headers : {
          'Authorization': `Bearer ${cookies.token}`
        },
      })
      .then((res) => {
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      })  
    }
  }

  return (
    <div className='profile'>
      <Header/>
      <div className='profile__container'>
        <h2 className='profile__container__title'>ユーザー情報編集</h2>
  
        <form className='profile__container__form' onSubmit={handleSubmit(onUpdata)}>
          <div className='profile__container__form__current-user-name'>
            <label>現在のユーザー名</label>
            <label>{currentUserName}</label>
          </div>

          <label>新しいユーザー名</label>
          <input
          className='profile__container__form__new-user-name'
            {...register('name', {required: '*新しいユーザ名を入力して下さい' })}
            type="text"
            placeholder="新しいユーザー名"
          />
          {errors.name?.message && <p className='required-errmsg'>{errors.name.message}</p>}
          <div>
            <input type='submit' value='更新' />
          </div>
        </form>
        <button className='profile__container__form__back-btn' onClick={back}>ホームに戻る</button>
      </div>
    </div>
  )
}

export default UserEdit