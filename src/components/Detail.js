import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Header from './Header';
import '../css/Detail.scss';

function Detail(props) {
  const {axiosInstance, user, cookies} = props;
  const [detail, setDetail] = useState([])
  const params = useParams('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosInstance.get(`/books/${params.id}`)
    .then((res) => {
      setTimeout(() => {
        setLoading(false)
        setDetail(res.data)
      }, 1000)
      .catch((err) => {
        console.log(err)
      })  
    })
  }, [])


  return (
    <>
      {loading ? (
        <p className='loading'>Loading</p>
      ) : (
        <div className='detail'>
        <Header />
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
            <p className='detail__container__detail-wrapper__title'>レビュー</p>
            <p  className='detail__container__detail-wrapper__content'>{detail.review}</p>
          </div>
        </div>
      </div>
      )}
    </>

  )
}

export default Detail