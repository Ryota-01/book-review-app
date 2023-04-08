import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { url } from "../Url";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Header from './Header'

function UserEdit() {
  const [cookies] = useCookies();
  const [currentUserName, setCurrentUserName] = useState('')
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const navigate = useNavigate('')

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
  })

  const onUpdata = (e) => {
    console.log(e)
    const data = {
      name: e.name
    }

    axios.put(`${url}/users`, data, {
      headers : {
        'Authorization': `Bearer ${cookies.token}`
      },
    })
    .then((res) => {
      alert('ユーザー名を更新しますか？')
      navigate('/home')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Header/>
      <h2>ユーザー情報編集</h2>
      <label>現在のユーザー名</label>
      <label>{currentUserName}</label>
      <form onSubmit={handleSubmit(onUpdata)}>
        <label>新しいユーザー名</label>
        <input
          {...register('name', {required: '*新しいユーザ名を入力して下さい' })}
          type="text"
          placeholder="新しいユーザー名"
        />
        {errors.name?.message && <p className='required-errmsg'>{errors.name.message}</p>}
        <button onClick={onUpdata}>更新</button>
      </form>
    </div>
  )
}

export default UserEdit