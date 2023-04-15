import React from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from './Header'
import { param } from 'cypress/types/jquery'

function Edit(props) {
  const { axiosInstance } = props;
  const {register, handleSubmit, formState: { errors }} = useForm('')
  const location = useLocation('')
  const params = useParams('')
  const navigate = useNavigate('')
  const [edit, setEdit] = useState(location.state)
  const onChange = (e) => setEdit(e.target.value);

  const onUpdataReview = (e) => {
    if(window.confirm('ユーザー名を更新しますか？')) {
      const data = {
        title : e.title,
        url : e.url,
        detail : e.detail,
        review : e.review
      }
      axiosInstance.put(`/books/${params.id}`, data)
      .then((res) => {
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      })  
    }
  }


  return (
    <>
      <Header />
      <div className='edit__container'>
        <h2 className='edit__container__title'>レビューを編集する</h2>
        <form className='edit__container__form' onSubmit={handleSubmit(onUpdataReview)}>
          <ul className='edit__container__form__list'>
              <li className='edit__container__form__list-item'>
                <label for='title'>
                  <p>書籍タイトル *</p>
                  <input
                    id='title'
                    {...register('title', {required: '*書籍タイトルを入力してください' })}
                    type="text"
                    value={edit.title}
                    onChange={onChange}
                  />
                </label>
                {errors.title?.message && <p className='required-errmsg'>{errors.title.message}</p>}                
              </li>

              <li className='edit__container__form__list-item'>
                <label for='url'>
                  <p>URL</p>
                  <input 
                    id='url'
                    {...register('url')}
                    type="text"
                    value={edit.url}
                    onChange={onChange}
                  />
                </label>
              </li>

              <li className='edit__container__form__list-item'>
                <label for='detail'>
                  <p>詳細 *</p>
                  <textarea
                    id='detail'
                    rows='3'
                    {...register('detail', {required: '*詳細を入力してください' })}
                    type="text"
                    value={edit.detail}
                    onChange={onChange}
                  />                
                  </label>
                {errors.detail?.message && <p className='required-errmsg'>{errors.detail.message}</p>}
              </li>

              <li className='edit__container__form__list-item'>
                <label for='review'>
                  <p>レビュー *</p>
                  <textarea
                    id='review'
                    rows='6'
                    {...register('review', {required: '*レビューを入力してください' })}
                    type="text"
                    value={edit.review}
                    onChange={onChange}
                  />
                </label>
                {errors.review?.message && <p className='required-errmsg'>{errors.review.message}</p>}
              </li>
            </ul>
            <input type='submit' value='更新' />
            <input type='submit' value='削除' />
        </form>
      </div>
    </>
  )
}

export default Edit