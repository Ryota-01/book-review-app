import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import Pagenation from './Pagenation';
import axios from 'axios';

function BookList(props) {

  const { books, currentBookLists, setBackLists, setNextLists } = props;

  return(
    <>
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {currentBookLists.map((book) => {                    //書籍一覧の配列の中身を、mapで個別に取得
            return(
              <Link key={book.id} to='{book.url}'>
                <ul className='booklists__wrapper-item'>
                  <li className="booklists__wrapper-title">
                    『 {book.title} 』
                  </li>
                </ul>
              </Link>
            )
          })}
        </div>
      </section>

    </>
  )
}

export default BookList