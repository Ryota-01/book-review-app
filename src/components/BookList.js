import React from 'react';
import '../css/BookList.scss';
import { Link } from 'react-router-dom';
import userIcon from '../img/user-solid.svg';

function BookList(props) {

  const { currentBooksList } = props;
  console.log(currentBooksList)

  return(
  <>
    <section className='booklists'>
      <h2 className='booklists__title'>書籍一覧</h2>
      <p className='booklists__description'>Book Review Appに投稿された本、雑誌、電子書籍の一覧ページです。
      随時レビュー更新中です。</p>
  
      <Link to='/new'><button>レビューを投稿する</button></Link>
      
      {currentBooksList.map((book) => {                            //書籍一覧の配列の中身を、mapで展開
        return(
          <div className='booklists__wrapper' key={book.id}>
            <div className='booklists__wrapper__book-image'>IMAGE</div>
            <ul className='booklists__wrapper__list'>
              <li className='booklists__wrapper__list-item__title'>
                <Link to= {{pathname: `/detail/${book.id}`, query: book}} state={book}>
                  <h3>{book.title}</h3>
                </Link>
              </li>
              <li className='booklists__wrapper__list-item__reviewer'>
                <img className='user-icon' src={userIcon} />
                <p>投稿者：{book.reviewer} </p>
              </li>
              <li className='booklists__wrapper__list-item__detail'>
                {book.detail} 
              </li>
              <li className='clear'></li>
            </ul>
            
          </div>
        )
      })}
    </section>
  </>
  )
}

export default BookList