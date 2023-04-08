import React from 'react';
import '../css/BookList.scss';

function BookList(props) {

  const { currentBooksList } = props;

  return(
    <>
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {currentBooksList.map((book) => {                  //書籍一覧の配列の中身を、mapで展開
            return(
              <ul className='booklists__wrapper__list' key={book.id}>
                <li className='booklists__wrapper__list-item'>
                  『 {book.title} 』
                </li>
              </ul>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default BookList