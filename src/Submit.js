import React from 'react'

const Submit = () => {
  var x = sessionStorage.getItem('count');
  return (
    <div>
      

      
      <div className='submission'>
       <p className='thank'>Thank you for your submission</p> 
       <p className='total'> Total number or correct answers  : {x} </p> 
      </div>
     
    </div>
  )
}

export default Submit
