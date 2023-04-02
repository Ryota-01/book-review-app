import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookList from './BookList';
import axios from 'axios';
import { useCookies } from "react-cookie";

function Pagenation(props) {

  const { books, currentUrl, setBooks } = props;
  const {nextLists, setNextLists} = useState([])
  const {backLists, setBackLists} = useState([])
  const [itemsOffset, setItemsOffset] = useState(0)
  const itemsPerPage = 10;                                //画面上に表示する書籍の数
  const endOffset = itemsOffset + itemsPerPage;           //画面上に表示している書籍の末尾の要素数
  const currentBookLists = props.books.slice(itemsOffset, endOffset)
  const pageCount = Math.ceil(books.length / itemsPerPage);
  const [cookies] = useCookies();
  const [offset, setOffset] = useState(0)

  const backBtnClick = () => {
    setOffset(offset - itemsPerPage)
    console.log(offset)
    axios.request(`${currentUrl}${offset}`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      console.log(res.data)
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const nextBtnClick = () => {
    const new_offset = 10 + itemsPerPage
    setOffset(new_offset)
    console.log(offset)
    axios.request(`${currentUrl}${offset}`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      console.log(res.data)
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <BookList
        books={books}
        currentBookLists={currentBookLists}
        setBackLists={setBackLists}
        setNextLists={setNextLists}
      />
      <button onClick={backBtnClick}>BACK</button>
      <button onClick={nextBtnClick}>NEXT</button>

    </div>
  )
}

export default Pagenation