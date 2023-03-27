import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';
import '../css/BookLists.scss';

function BookLists() {
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
      <div className='book-container'>
        <h2 className='head-text'>書籍一覧</h2>
        <div className='booklists-area'>
          {books.map((book) => {
            console.log(book)
            return(
              <Link to='{book.url}'>
                <ul key={book.id}>
                  <li key={book.id} className="book-title">
                    『{book.title}』
                  </li>
                </ul>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BookLists