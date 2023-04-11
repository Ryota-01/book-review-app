import React from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import '../css/Review.scss';

function Review() {
  const location = useLocation('')
  const bookInfo = location.state;
  console.log(bookInfo)

  return (
    <div className='review'>
      <Header />
      <div className='review__container'>

        <div className='review__container__book-info'>
          <div className='review__container__book-info__image'>IMAGE</div>
          <ul className='review__container__book-info__list'>
            <li className='review__container__book-info__list__title'><h2>{bookInfo.title}</h2></li>
            <li className='review__container__book-info__list__reviewer'>投稿者：{bookInfo.reviewer}</li>
            <li className='review__container__book-info__list__detail'>{bookInfo.detail}</li>
          </ul>
        </div>
        <div className='review__container__review-wrapper'>
          <p className='review__container__review-wrapper__title'>レビュー</p>
          <p  className='review__container__review-wrapper__content'>{bookInfo.review}</p>
        </div>
      </div>
    </div>
  )
}

export default Review