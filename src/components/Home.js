import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { url } from "../Url";
import { signIn, signOut } from '../userSlice'
import axios from 'axios';
import Header from './Header';
import '../css/Home.scss';
import PagenationBtn from '../css/PagenationBtn';
import BookList from './BookList';


function Home() {

  return (
    <>
      <Header />
      <BookList />
      <PagenationBtn />
    </>
  )
}

export default Home