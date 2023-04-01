import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { url } from "../Url";

function Pagenation() {
  const [pegeNation, setPageNation] = useState([])


  useEffect(() => {
    axios.get(`${url}/public/books`, {
      'Authorization': `Bearer ${cookies.token}`,
    })
    .then((res) => {
      console.log(res.data.next)
      setPageNation(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

}

export default Pagenation