import React from 'react'
import Header from './Header'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { url } from "../Url";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import '../css/PostReview.scss';

function PostReview() {
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const [cookies, setCookie ] = useCookies()
  const navigate = useNavigate('')

  ///「投稿」ボタンを押した時の処理
  const onPostReview = (e) => {
    const data = {
      title : e.title,
      url : e.url,
      detail : e.detail,
      review : e.review
    }
    axios.post(`${url}/books`, data, {
      headers : {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      //投稿と同時にHomeページに遷移させる
      navigate('/home')
    })
    .catch((err) => {
      console.log(err)
    })  
  }

  return (
    <div className='post-review'>
      <Header />
      <div className='post-review__container'>
        <h2 className='post-review__container__title'>レビューを投稿する</h2>
        <form className='post-review__container__form' onSubmit={handleSubmit(onPostReview)}>
          <ul className='post-review__container__form__list'>
            <li className='post-review__container__form__list-item'>
              <label for='title'>
                <p>書籍タイトル *</p>
                <input
                  id='title'
                  {...register('title', {required: '*書籍タイトルを入力してください' })}
                  type="text"
                />
              </label>
              {errors.title?.message && <p className='required-errmsg'>{errors.title.message}</p>}                
            </li>

            <li className='post-review__container__form__list-item'>
              <label for='url'>
                <p>URL</p>
                <input 
                  id='url'
                  {...register('url')}
                  type="text"
                />
              </label>
            </li>

            <li className='post-review__container__form__list-item'>
              <label for='detail'>
                <p>詳細 *</p>
                <textarea
                  id='detail'
                  rows='3'
                  {...register('detail', {required: '*詳細を入力してください' })}
                  type="text"
                />                
                </label>
              {errors.detail?.message && <p className='required-errmsg'>{errors.detail.message}</p>}
            </li>

            <li className='post-review__container__form__list-item'>
              <label for='review'>
                <p>レビュー *</p>
                <textarea
                  id='review'
                  rows='6'
                  {...register('review', {required: '*レビューを入力してください' })}
                  type="text"
                />
              </label>
              {errors.review?.message && <p className='required-errmsg'>{errors.review.message}</p>}
            </li>
          </ul>
          <button className='post-review__container__form__post-btn'>投稿する</button>
        </form>
      </div>

    </div>
  )
}

export default PostReview
