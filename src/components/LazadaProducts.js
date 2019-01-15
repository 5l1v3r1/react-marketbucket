import axios from "axios";
import React, { Component } from 'react'

export default class LazadaProducts extends Component {
  state = {
    lazadaProducts: null
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/products/lazada',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
    })
      .then(response => {
        const { data } = response;
        const { products } = data
        this.setState({
          lazadaProducts: products
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render () {
    
    const { lazadaProducts } = this.state
    return (
      lazadaProducts ?
      <>
      Total products : {lazadaProducts.total_products}
      {lazadaProducts.products.map((product, index) => (
        <ul key={index}>
        <li>
        <ul>
<li>{product.attributes.name}</li>
<li>{product.attributes.brand}</li>
<li>{product.attributes.short_description}</li>
<li>{product.skus[0].Status}</li>
<li>{product.skus[0].quantity}</li>
<li>{product.skus[0].price}</li>
</ul>
</li>
</ul>
      )
    )
  }
  </> : <p>No products yet!</p>
    )
}
}