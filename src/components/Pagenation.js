import React from 'react'
import { useState } from 'react';


function Pagenation(props) {
  console.log(props)

  const [itemsOffset, setItemsOffset] = useState(0)

  const itemsPerPage = 10;                                //画面上に表示する書籍の数

  const endOffset = itemsOffset + itemsPerPage;           //画面上に表示している書籍の末尾の要素数

  const currentBookLists = props.books.slice(itemsOffset, endOffset)

  // props.setCurrentBookLists(currentBookLists)

  return (
    <div>
      Pagenation
    </div>
  )
}

export default Pagenation