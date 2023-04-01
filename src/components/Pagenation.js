import React from 'react'
import { useState } from 'react';
import BookList from './BookList';

function Pagenation(props) {
  const { books } = props;

  const [itemsOffset, setItemsOffset] = useState(0)

  const itemsPerPage = 10;                                //画面上に表示する書籍の数

  const endOffset = itemsOffset + itemsPerPage;           //画面上に表示している書籍の末尾の要素数

  const currentBookLists = props.books.slice(itemsOffset, endOffset)
  
  return (
    <div>
      <BookList books={books} currentBookLists={currentBookLists} />
    </div>
  )
}

export default Pagenation