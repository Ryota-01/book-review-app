import React from 'react'
import Header from './Header'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { url } from "../Url";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

function PostReview() {
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const [cookies, setCookie ] = useCookies()
  const navigate = useNavigate('')


  const onPostReview = (e) => {
    console.log(e)
    console.log(register)
    const data = {
      title : e.title,
      url : e.url,
      detail : e.detail,
      review : e.review
    }

    axios.post(`${url}/books`, data, {
      headers : {
        'Authorization': `Bearer ${cookies.token}`
      },

    })
    .then((res) => {
      console.log(res)
      navigate('/home')
    })
    .catch((err) => {
      console.log(err)
    })
  
  }



  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onPostReview)}>
        <label>書籍タイトル</label>
        <input
          {...register('title', {required: '*書籍タイトルを入力してください' })}
          type="text"
        />
        <label>URL</label>
        <input 
          {...register('url')}
          type="text"
        />
        <label>詳細</label>
        <input
          {...register('detail', {required: '*詳細を入力してください' })}
          type="text"
        />
        <label>レビュー</label>
        <input
          {...register('review', {required: '*レビューを入力してください' })}
          type="text"
        />
        <button>投稿する</button>
      </form>
    </div>
  )
}

export default PostReview
