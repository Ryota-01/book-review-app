import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';
import '../css/Home.scss';

function Home() {
  const [books, setBooks] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies()

  useEffect(() => {
    axios.get(`${url}/public/books`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      console.log(res.data)
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

  return (
    <>
      <Header />
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {books.map((book) => {
            console.log(book)
            return(
              <Link to='{book.url}'>
                <ul key={book.id} className='booklists__wrapper-item'>
                  <li key={book.id} className="booklists__wrapper-title">
                    『{book.title}』
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

export default Home