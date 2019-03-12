import React from 'react'
import spinner from './spinner.gif';
const Spinner = () => {
  return (
    <div>
      <img 
      style={{width: '200px' , margin: 'auto', display:'block'}}
      src={spinner} 
      alt="loading..."></img>
    </div>
  )
}

export default Spinner;
