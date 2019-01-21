import axios from "axios";
import React, { Component, Fragment } from 'react'
import {
  Card, CardImg, CardText, CardBody, Alert,
  CardTitle, CardSubtitle, Button, Row, Col,
  CardLink, CardHeader, CardFooter
} from 'reactstrap';
import AddProducts from "./AddProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LazadaProducts extends Component {
  state = {
    lazadaProducts: null,
    modal: false,
    lazada: localStorage.lazadaToken === "null" ? null : localStorage.lazadaToken,
    shopee: localStorage.shopeeShopId === "null" ? null : localStorage.shopeeShopId,

  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
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

  render() {

    const { lazadaProducts, modal, lazada, shopee } = this.state
    return (
      <>
        {modal ? <AddProducts toggleModal={this.toggleModal} modal={modal} lazada={lazada} shopee={shopee} /> : null}
        <Col md='3' className='mb-auto ml-auto mr-auto mt-5'>
          <Card onClick={this.toggleModal} className='btn'>
            <div className='card-img-top border-bottom text-center pb-2'><FontAwesomeIcon icon="parachute-box" size='9x' /></div>
            <CardBody>
              <CardTitle className='text-center'><b>Add a product</b></CardTitle>
              <CardText className='text-left'>Choose the marketplace you would like to add a product to and enter your product details when prompted</CardText>
            </CardBody>
          </Card>
        </Col>
        {lazadaProducts ?
          lazadaProducts.products.map((product, index) => (
            <Col md='3' key={index} className='mb-5 ml-5 mr-auto mt-5'>
              <Card className=''>
                <CardHeader>
                  <CardTitle className='text-center'><b>{product.attributes.name}</b></CardTitle>
                  <CardSubtitle className='text-center'>Brand : {product.attributes.brand}</CardSubtitle>
                </CardHeader>
                <CardImg className='border-bottom' top width="100%" src={product.skus[0].Images[0]} alt="Card image cap" />
                <CardBody>
                  {/* <CardText className='text-left'><span dangerouslySetInnerHTML={{ __html: product.attributes.short_description }} /></CardText> */}
                  <CardText><span className='mr-5'>Price : {product.skus[0].price} MYR</span><span className='ml-5 '>Stock : {product.skus[0].quantity}</span></CardText>
                </CardBody>
                <CardFooter>
                  <CardLink className='mr-5' href={product.skus[0].Url} target="_blank" rel="noopener noreferrer">Product's Page</CardLink>
                  <span className='ml-5 text-muted'>Edit</span>
                </CardFooter>
              </Card>
            </Col>
          )
          )
          : <Col md='3' className='mb-5 ml-5 mr-auto mt-5'><Alert color='info'>Loading...</Alert></Col>}
      </>
    )
  }
}