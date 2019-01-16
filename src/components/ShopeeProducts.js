import axios from "axios";
import React, { Component } from 'react'

export default class ShopeeProducts extends Component {
  state = {
    shopeeProducts: null
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/products/shopee',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
    })
      .then(response => {
        debugger
        const { data } = response;
        const { products } = data
        this.setState({
          shopeeProducts: products
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {

    const { shopeeProducts } = this.state
    return (
      shopeeProducts ?
        <>
          Total products : {shopeeProducts.length}
          {/* {shopeeProducts.products.map((product, index) => (
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
          } */}
        </> : <p>No products yet!</p>
    )
  }
}