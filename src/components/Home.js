import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { url } from "../Url";
import { Link } from 'react-router-dom';
import Header from './Header';
import Pagenation from './Pagenation';
import '../css/Home.scss';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user.isSignIn)
  const [currentBooksList, setCurrentBooksList] = useState([]);        //現在の書籍一覧を格納する変数
  const [apiUrl, setApiUrl] = useState('');                            //取得したAPIを格納する変数
  const [cookies] = useCookies();
  const [offset, setOffSet] = useState(0)                             //offset値を格納
  const baseUrl = `${url}books?offset=`;                       //baseURLを設定

  useEffect(() => {                                                   //書籍一覧APIを取得
    if(!user) {
      axios.get('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/public/books?offset=')
      .then((res) => {
        console.log(res)
        setCurrentBooksList(res.data)                     //取得した書籍一覧をセット
        setApiUrl(res.config.url)                         //取得した書籍一覧のAPI URLをセット
        setOffSet(offset + res.data.length)               //取得したデータの配列のlengthを、offsetの値としてセット
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      axios.get(baseUrl, {
        headers : {
          'Authorization': `Bearer ${cookies.token}`,
        }
      })
      .then((res) => {
        console.log(res)
        setCurrentBooksList(res.data)                     //取得した書籍一覧をセット
        setApiUrl(res.config.url)                         //取得した書籍一覧のAPI URLをセット
        setOffSet(offset + res.data.length)               //取得したデータの配列のlengthを、offsetの値としてセット
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, []);


  return (
    <>
    <Header />
    <Pagenation
      currentBooksList={currentBooksList}
      setCurrentBooksList={setCurrentBooksList}
      apiUrl={apiUrl}
      offset={offset}
      setOffset={setOffSet}
    />                                                   {/*Pagenationコンポーネントに書籍一覧をpropsで渡す*/}
    </>
   )}

export default Home