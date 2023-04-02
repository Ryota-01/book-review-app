import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';
import '../css/Home.scss';
import Pagenation from './Pagenation';

function Home() {
  const [books, setBooks] = useState([]);                   //書籍一覧を格納する変数
  const [cookies] = useCookies();
  const [currentUrl, setCurrentUrl] = useState(`${url}public/books?offset=`)

  useEffect(() => {                                         //書籍一覧APIを取得
    axios.get(currentUrl, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      setBooks(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <>
    <Header />
    <Pagenation
      books={books}
      setBooks={setBooks}
      currentUrl={currentUrl}
    />                        {/*Pagenationコンポーネントに書籍一覧をpropsで渡す*/}
    </>
   )}

export default Home