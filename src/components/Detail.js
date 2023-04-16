import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import '../css/Detail.scss';
import '../css/Loading.scss';

function Detail(props) {
  const { axiosInstance, user } = props;
  const [ detail, setDetail ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const params = useParams('')

  useEffect(() => {
    axiosInstance.get(`/books/${params.id}`)
    .then((res) => {
      setTimeout(() => {
        setLoading(false)
        setDetail(res.data)
        //最初にローディングを表示させるため、1秒待機
      }, 3000)
      .catch((err) => { console.log(err) })  
    })
  }, [])

  return (
    <>
      {loading ? (
        <div className='loader'>Loading</div>
      ) : (
        <div className='detail'>
        <Header user={user}/>
        <div className='detail__container'>
          <div className='detail__container__book-info'>
            <div className='detail__container__book-info__image'>IMAGE</div>
            <ul className='detail__container__book-info__list'>
              <li className='detail__container__book-info__list__title'><h2>{detail.title}</h2></li>
              <li className='detail__container__book-info__list__reviewer'>投稿者：{detail.reviewer}</li>
              <li className='detail__container__book-info__list__detail'>{detail.detail}</li>
            </ul>
          </div>
          <div className='detail__container__detail-wrapper'>
            <p className='detail__container__detail-wrapper__title'>レビュー <span>★★★</span></p>
            <p  className='detail__container__detail-wrapper__content'>{detail.review}</p>
          </div>
        </div>
      </div>
      )}
    </>

  )
}

export default Detail