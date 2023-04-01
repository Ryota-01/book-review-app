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
      console.log(res.data)
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

  return (
    <>
      <Pagenation
        books={books}
      />        {/*Pagenationコンポーネントに書籍一覧をpropsで渡す*/}
    </>
   )}

export default Home