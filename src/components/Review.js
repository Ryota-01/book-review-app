import React from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'
import Header from './Header'

function Review() {
  const params = useParams('')
  const location = useLocation('')
  const bookInfo = location.state;
  console.log(bookInfo)

  return (
    <div>
      <Header />
      <div>
        <div>IMAGE</div>
        <h2>{bookInfo.title}</h2>
        <p>{bookInfo.url}</p>
        <p>投稿者：{bookInfo.reviewer}</p>
        <p>{bookInfo.review}</p>
      </div>
    </div>
  )
}

export default Review