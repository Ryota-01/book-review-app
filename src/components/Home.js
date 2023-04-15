import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import Header from './Header';
import Pagenation from './Pagenation';
import '../css/Home.scss';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user.isSignIn)
  const [currentBooksList, setCurrentBooksList] = useState([]);        //現在の書籍一覧を格納する変数
  const [cookies] = useCookies();
  const [offset, setOffSet] = useState(0)                             //offset値を格納

  const axiosInstance = axios.create({
    baseURL :  'https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/',
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    }
  })

  useEffect(() => {
    if(!user) {
      axiosInstance.get(`/public/books?offset=${offset}`)
      .then((res) => {
        setCurrentBooksList(res.data)                     //最初に取得した書籍一覧をセット
        setOffSet(res.data.length)               //取得したデータの配列のlengthを、offsetの値としてセット
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      axiosInstance.get(`/books?offset=${offset}`)
      .then((res) => {
        setCurrentBooksList(res.data)                     //最初に取得した書籍一覧をセット
        setOffSet(res.data.length)               //取得したデータの配列のlengthを、offsetの値としてセット
      })
      .catch((err) => {
        console.log(err)
      })
    }  
  }, [])

  return (
    <>
    <Header />
    <Pagenation
      axiosInstance={axiosInstance}
      currentBooksList={currentBooksList}
      setCurrentBooksList={setCurrentBooksList}
      offset={offset}
      setOffset={setOffSet}
    />                                                   {/*Pagenationコンポーネントに書籍一覧をpropsで渡す*/}
    </>
   )}

export default Home