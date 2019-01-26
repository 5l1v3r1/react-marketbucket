import axios from "axios";
import React, { Component } from 'react'
import {
  Card, CardImg, CardText, CardBody, Alert,
  CardTitle, CardSubtitle, Col, Row,
  CardLink, CardHeader, CardFooter
} from 'reactstrap';
import AddProducts from "./AddProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LazadaProducts extends Component {
  state = {
    shopeeProducts: null,
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

    const { shopeeProducts, modal, lazada, shopee } = this.state
    return (
      <>
        {modal ? <AddProducts toggleModal={this.toggleModal} modal={modal} lazada={lazada} shopee={shopee} /> : null}
        <Col md='9' className=''>
        {!shopeeProducts ? <Alert color='info' className=''>Loading...</Alert>: null}
        <Row className=''>
        <Card onClick={this.toggleModal} className='btn mr-4 ml-4 mt-5 w-25'>
            <div className='card-img-top border-bottom text-center pb-2'><br/><FontAwesomeIcon icon="parachute-box" size='9x' /></div><br/>
            <CardBody>
              <CardTitle className='text-center'><b>Add a product</b></CardTitle>
              <CardText className='text-left'>Choose the marketplace you would like to add a product to and enter your product details when prompted</CardText>
            </CardBody>
          </Card>
        {shopeeProducts ?
          shopeeProducts.map((product, index) => (
            <Card key={index} className='mr-4 ml-4 mt-5 w-25'>
                <CardHeader>
                  <CardTitle className='text-center'><b>{product.name}</b></CardTitle>
                  <CardSubtitle className='text-center'>Brand : {product.attributes[0].attribute_value}</CardSubtitle>
                </CardHeader>
                <CardImg className='border-bottom' top width="100%" src={product.images[0]} alt="Card image cap" />
                <CardBody>
                  {/* <CardText className='text-left'><span dangerouslySetInnerHTML={{ __html: product.attributes.short_description }} /></CardText> */}
                  <CardText><span className='mr-4'>Price : {product.price} MYR</span><span className='ml-4'>Stock : {product.stock}</span></CardText>
                </CardBody>
                <CardFooter>
                  <CardLink className='mr-5' href={`https://shopee.com.my/${product.name.replace(" ", "-")}-i.${shopee}.${product.item_id}`} target="_blank" rel="noopener noreferrer">Product's Page</CardLink>
                  <span className='ml-5 text-muted'>Edit</span>
                </CardFooter>
              </Card>
          )
          )
          : null}
        </Row></Col>
      </>
    )
  }
}