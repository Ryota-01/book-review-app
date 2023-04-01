import React from 'react'
import { useState } from 'react'

function PagenationBtn(props) {

  const { pageCount, itemsPerPage, baseUrl } = props
  const { currentLists, setCurrentLists } = useState()


  const handleOnBack = () => {
    
  }

  const handleOnNext = () => {
    
  }
  
  return (
    <div>
      <button onClick={handleOnBack}>BACK</button>
      <button onClick={handleOnNext}>NEXT</button>
    </div>
    
  )
}

export default PagenationBtn