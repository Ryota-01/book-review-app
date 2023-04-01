import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';
import '../css/Home.scss';
import BookList from './BookList';
import Pagenation from './Pagenation';

function Home() {

  const [books, setBooks] = useState([]);                   //書籍一覧を格納する変数
  const [cookies] = useCookies();

  useEffect(() => {                                         //書籍一覧APIを取得
    axios.get(`${url}/public/books`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

  return (
    <>
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {books.map((book) => {                           //書籍一覧の配列の中身を、mapで個別に取得
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
        <Pagenation
          books={books}
        />        {/*Pagenationコンポーネントに書籍一覧をpropsで渡す*/}
      </section>
    </>
   )}

export default Home