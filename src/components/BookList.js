import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    axios.get(`${url}/public/books`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      console.log(res.data.next)
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

  const handleOnClick = () => {
    axios.get(`${url}/public/books?offset=20`)
    .then((res) => {
      console.log(res.data)
      const datas = res.data;
      datas.map((data) => {
        console.log(data.title)
      })
    })
  }

  return (
    <>
      <section className='booklists'>
        <h2 className='booklists__title'>書籍一覧</h2>
        <div className='booklists__wrapper'>
          {books.map((book) => {
            console.log(book)
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
  )}

export default BookList