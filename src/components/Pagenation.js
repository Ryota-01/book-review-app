import React from 'react'
import { useState } from 'react';
import BookList from './BookList';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { url } from "../Url";
import '../css/Pagenation.scss'

function Pagenation(props) {
  console.log(props)
  const {
    currentBooksList,
    setCurrentBooksList,
    apiUrl,
    offset,
    setOffset
  } = props;

  const [cookies] = useCookies();
  const [nextList, setNextList] = useState([]);

  // const [itemsOffset, setItemsOffset] = useState(0);
  // const [disabled, setDisabled] = useState(true)
  // const itemsPerPage = 10;                                //画面上に表示する書籍の数
  // const endOffset = itemsOffset + itemsPerPage;           //画面上に表示している書籍の末尾の要素数
  // const currentBookLists = props.currentBooksList.slice(itemsOffset, endOffset)
  // const pageCount = Math.ceil(currentBooksList.length / itemsPerPage);

  const backBtnClick = () => {
    axios.get(apiUrl + (offset - 20), {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      setNextList(res.data)
      setCurrentBooksList(res.data)
      setOffset(offset - 10)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  console.log(offset)

  const nextBtnClick = () => {
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
    <div>
      <BookList
        currentBooksList={currentBooksList}
        nextList={nextList}
      />
      <div className='btn-area'>
        <button
          onClick={backBtnClick}
          className="btn"
          disabled={offset < 20}
          >
            BACK　＜
        </button>

        <button
          onClick={nextBtnClick}
          disabled={currentBooksList.length < 10}
          className="btn"
          >
            ＞　NEXT
        </button>
      </div>

    </div>
  )
}

export default Pagenation