import '../css/BookList.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import userIcon from '../img/user-solid.svg';

function BookList(props) {
  const { currentBooksList, axiosInstance } = props;
  const [ userName, setUserName ] = useState('')

  axiosInstance.get('users')
  .then((res) => { setUserName(res.data.name) })
  .catch((err) => { console.log(err) })

  return(
  <>
    <section className='booklists'>
      <h2 className='booklists__title'>書籍一覧</h2>
      <p className='booklists__description'>
        Book Review Appに投稿された本、雑誌、電子書籍の一覧ページです。随時レビュー更新中です。
      </p>
  
      <Link to='/new'><button className='edit-btn'>レビューを投稿する</button></Link>
      
      {currentBooksList.map((book) => {                            //書籍一覧の配列の中身を、mapで展開
        const id = book.id
        const reviewer = book.reviewer
        const detail = book.detail
        return(
          <div className='booklists__wrapper' key={id}>
            <div className='booklists__wrapper__book-image'>IMAGE</div>
            <ul className='booklists__wrapper__list'>
              <li className='booklists__wrapper__list-item__title'>
                <Link
                  to= {{pathname: `/detail/${book.id}`, 
                  query: book}}
                  state={book}
                  onClick={() => {
                    axiosInstance.post('/logs', {selectBookId: book.id})
                    .then((res) => { console.log(res.config.data) })
                    .catch((err) => { console.log(err) })
                  }}
                  className='book-title'
                >
                  <h3>{book.title}</h3>
                </Link>
              </li>

              <li className='booklists__wrapper__list-item__reviewer'>
                <img className='user-icon' src={userIcon} alt='ユーザーアイコン'/>
                投稿者：{reviewer}
              </li>

              <li className='booklists__wrapper__list-item__detail'>{detail}</li>

              <li className='clear'></li>
              <li className='booklists__wrapper__list-item__edit-link'>
                {
                  (() => {
                    if(userName === book.reviewer) {
                      return (
                        <Link
                          to= {{pathname: `/edit/${book.id}`, 
                          query: book}}
                          state={book}
                          detail={book}
                        >
                          レビューを編集する
                        </Link>
                      )
                    }
                  })()
                }
              </li>
            </ul>
          </div>
        )
      })}
    </section>
  </>
  )
}

export default BookList