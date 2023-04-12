import React from 'react'
import BookList from './BookList';
import axios from 'axios';
import { useCookies } from "react-cookie";
import '../css/Pagenation.scss'

function Pagenation(props) {
  console.log(props)
  const {
    currentBooksList,
    axiosInstance,
    setCurrentBooksList,
    apiUrl,
    offset,
    setOffset
  } = props;
  console.log(axiosInstance)
  const [cookies] = useCookies();

  const backBtnClick2 = () => {
    axiosInstance.get(10)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const nextBtnClick2 = () => {
    axiosInstance(`public/books?offset=${}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const backBtnClick = () => {                            //BACKボタンを押した時の処理（前の10件を表示）
    axios.get(apiUrl + (offset - 20), {
      headers : {
        'Authorization': `Bearer ${cookies.token}`,
      }
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
      headers : {
        'Authorization': `Bearer ${cookies.token}`,
      }
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
          onClick={nextBtnClick2}
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