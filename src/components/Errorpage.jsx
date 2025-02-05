import React from 'react'
import '../App.css'

const Errorpage = () => {
  return (
    <div id ='notfound'>
        <div className='notfound'>
            <div className='notfound-404'>
                <h1>404</h1>
            </div>
            <h2>WE ARE SORRY,PAGE NOT FOUND</h2>
            <p className='mb-5'>
                The page you are looking for might have been removed 
                had its name changed or is temporarily unavaliable
            </p>
            <a href ='/'>Back To Homepage</a>
        </div>
    </div>
  )
}

export default Errorpage