import React from 'react'

const ErrorHandler = ({ marketplace_name }) => {
  return (
    <div className='container mt-5'>
      <h1 className='text-danger'>ERROR: You haven't signed up with {marketplace_name} yet!</h1>
      <p>you can add {marketplace_name} by following this  {marketplace_name === 'Shopee' ?
        <a href="http://localhost:5000/api/v1/marketplaces/check/shopee">Link!</a> : <a href="http://localhost:5000/api/v1/marketplaces/check/lazada">Link!</a>}</p>
    </div>
  )
}

export default ErrorHandler