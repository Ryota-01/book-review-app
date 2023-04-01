import React from 'react'
import { useState } from 'react'

function PagenationBtn() {
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <div>
      
      <button >前へ</button>
      <button >次へ</button>

    </div>
    
  )
}

export default PagenationBtn