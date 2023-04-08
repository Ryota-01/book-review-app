import React from 'react'
import { useState } from 'react';
import BookList from './BookList';
import axios from 'axios';
import { useCookies } from "react-cookie";
import '../css/Pagenation.scss'

function Pagenation(props) {
  const {
    currentBooksList,
    setCurrentBooksList,
    apiUrl,
    offset,
    setOffset
  } = props;

  const [cookies] = useCookies();
  // const [nextList, setNextList] = useState([]);

  const backBtnClick = () => {                            //BACKボタンを押した時の処理（前の10件を表示）
    axios.get(apiUrl + (offset - 20), {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      setCurrentBooksList(res.data)
      setOffset(offset - 10)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const nextBtnClick = () => {                            //NEXTボタンを押した時の処理（次の10件を表示）
    axios.get(apiUrl + offset, {
      'Authorization': `Bearer ${cookies.token}`,
    })
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
          disabled={offset < 20}
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