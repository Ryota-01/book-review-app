import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import Pagenation from './Pagenation';
import axios from 'axios';

function BookList(props) {

  const { currentBooksList, currentBookLists, setBackLists, nextList } = props;

  return(
    <>
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {currentBooksList.map((book) => {                  //書籍一覧の配列の中身を、mapで個別に取得
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