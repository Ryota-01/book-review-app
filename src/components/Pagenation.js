import React from 'react'
import BookList from './BookList';
import { useCookies } from "react-cookie";
import '../css/Pagenation.scss'

function Pagenation(props) {
  console.log(props)
  const {
    currentBooksList,
    axiosInstance,
    setCurrentBooksList,
    offset,
    setOffset
  } = props;
  console.log(axiosInstance)

  const [cookies] = useCookies();

  const backBtnClick = () => {                            //BACKボタンを押した時の処理（前の10件を表示
    axiosInstance(`public/books?offset=${offset - 10}`)
    .then((res) => {
      setOffset(offset - 10)
      setCurrentBooksList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const nextBtnClick = () => {
    console.log(offset)
    axiosInstance(`public/books?offset=${offset + 10}`)
    .then((res) => {
      setCurrentBooksList(res.data)
      setOffset(offset + 10)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='pagenation'>
      <BookList
        currentBooksList={currentBooksList}
      />
      <div className='pagenation__button-area'>
        <button
          onClick={backBtnClick}
          className="pagenation__button-area__select"
          disabled={offset < 10}
          >
            BACK　＜
        </button>
        
        <button
          onClick={nextBtnClick}
          disabled={currentBooksList.length < 10}
          className="pagenation__button-area__select"
          >
            ＞　NEXT
        </button>
      </div>

    </div>
  )
}

export default Pagenation