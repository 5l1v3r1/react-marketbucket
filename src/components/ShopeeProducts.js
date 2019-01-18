import axios from "axios";
import React, { Component, Fragment } from 'react'

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
          {shopeeProducts.map((product, index) => (
            <Fragment key={index}>
              <ul>
                <li>
                  <ul>
                    <li>{product.name}</li>
                    <li>{product.attributes[0].attribute_value}</li>
                    <li>{product.description}</li>
                    <li>{product.status}</li>
                    <li>{product.stock}</li>
                    <li>{product.price}</li>
                  </ul>
                </li>
              </ul>
              <hr />
            </Fragment>
          )
          )
          }
        </> : <p>No products yet!</p>
    )
  }
}