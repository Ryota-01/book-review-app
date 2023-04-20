import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Header from './Header'
import '../css/Edit.scss';

function Edit(props) {
  const params = useParams('')
  const navigate = useNavigate('')
  const location = useLocation('')
  const { axiosInstance } = props;
  const [ edit, setEdit ] = useState(location.state)
  const{
    register, 
    handleSubmit, 
    formState: { errors }} = useForm({
      defaultValues: {
        title: edit.title,
        url: edit.url,
        detail: edit.detail,
        review: edit.review
      }
    })

  const onChange = (e) => setEdit(e.target.value);

  const onDeleteReview = () => {
    if(window.confirm('書籍情報を削除しますか？')) {
      axiosInstance.delete(`/books/${params.id}`)
      .then((res) => { navigate('/home') })
      .catch((err) => { console.log(err) })  
    }
  }

  const onUpdataReview = (e) => {
    if(window.confirm('レビューを更新しますか？')) {
      const data = {
        title : e.title,
        url : e.url,
        detail : e.detail,
        review : e.review
      }
      axiosInstance.put(`/books/${params.id}`, data)
      .then((res) => { navigate('/home') })
      .catch((err) => { console.log(err) })  
    }
  }

  return (
    <>
      <Header />
      <div className='edit__container'>
        <h2 className='edit__container__title'>レビューを編集する</h2>
        <form className='edit__container__form'>
          <ul className='edit__container__form__list'>
            <li className='edit__container__form__list-item'>
              <label htmlFor='title'>
                <p>書籍タイトル *</p>
                <input
                  id='title'
                  {...register('title', {required: '*書籍タイトルを入力してください' })}
                  type="text"
                  onChange={onChange}
                />
              </label>
              {errors.title?.message && <p className='required-errmsg'>{errors.title.message}</p>}                
            </li>
            <li className='edit__container__form__list-item'>
              <label htmlFor='url'>
                <p>URL</p>
                <input 
                  id='url'
                  {...register('url')}
                  type="text"
                  onChange={onChange}
                />
              </label>
            </li>
            <li className='edit__container__form__list-item'>
              <label htmlFor='detail'>
                <p>詳細 *</p>
                <textarea
                  id='detail'
                  rows='3'
                  {...register('detail', {required: '*詳細を入力してください' })}
                  type="text"
                  onChange={onChange}
                />                
                </label>
              {errors.detail?.message && <p className='required-errmsg'>{errors.detail.message}</p>}
            </li>
            <li className='edit__container__form__list-item'>
              <label htmlFor='review'>
                <p>レビュー *</p>
                <textarea
                  id='review'
                  rows='6'
                  {...register('review', {required: '*レビューを入力してください' })}
                  type="text"
                  onChange={onChange}
                />
              </label>
              {errors.review?.message && <p className='required-errmsg'>{errors.review.message}</p>}
            </li>
          </ul>
        </form>
        <button className='edit__container__form__post-btn' onClick={handleSubmit(onUpdataReview)}>更新</button>
        <button className='edit__container__form__post-btn' onClick={onDeleteReview}>削除</button>
      </div>
    </>
  )
}

export default Edit