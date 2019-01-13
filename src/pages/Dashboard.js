import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Redirect } from 'react-router-dom'
import AddMarketplace from '../components/AddMarketplace';
import axios from 'axios';

export default class Dashboard extends React.Component {

  state = {
    modal: false,
    lazada: false,
    shopee: false,
    lazadaCode: new URL(window.location.href).searchParams.get('code'),
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount = () => {
    if (this.state.lazadaCode) {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/api/v1/marketplaces/authorize/lazada',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${localStorage.jwt}`
        },
        data: {
          code: this.state.lazadaCode,
        }
      })
        .then(response => {
          const { data } = response;
          const { message, lazada_token } = data
          const marketplace = response.data.marketplace

          localStorage.setItem('lazadaToken', lazada_token)
          localStorage.setItem('lazadaMarketplace', JSON.stringify(marketplace))

          this.setState({
            lazada: true,
            lazadaCode: null
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({ errors: error.response.data.message })
        });
    }
  }

  render() {
    const { modal, lazada, shopee } = this.state
    if (localStorage.jwt) {
      return (
        <>
          {modal ? <AddMarketplace toggle={this.toggle} modal={modal} lazada={lazada} shopee={shopee} /> : null}
          <Row className='m-auto mt-5'>
            <Col md='3' className='mb-auto ml-auto mr-auto mt-5'>
              <Card onClick={this.toggle} className='btn'>
                <div className='card-img-top border-bottom text-center'><FontAwesomeIcon icon="plus" size="7x" /></div>
                <CardBody>
                  <CardTitle className='text-center'><b>Add a marketplace</b></CardTitle>
                  <CardText className='text-left'>Choose the marketplace you would like to add and enter your credentials when prompted</CardText>
                </CardBody>
              </Card>
            </Col>
            {lazada ?
              <Col md='3' className='mb-auto ml-auto mr-auto mt-5'>
                <Card>
                  <CardImg top width="100%" src="https://s3.amazonaws.com/market.bucket/Lazada.jpg" alt="Lazada" className='border-bottom' />
                  <CardBody>
                    <CardTitle className='text-center'><b>Lazada</b></CardTitle>
                    <CardText>Manage your Lazada Store</CardText>
                  </CardBody>
                </Card>
              </Col>
              : null}
            {shopee ?
              <Col md='3' className='mb-auto ml-auto mr-auto mt-5'>
                <Card >
                  <CardImg top width="100%" src="https://s3.amazonaws.com/market.bucket/Shopee.jpg" alt="Shopee" className='border-bottom' />
                  <CardBody>
                    <CardTitle className='text-center'><b>Shopee</b></CardTitle>
                    <CardText>Manage your Shopee store</CardText>
                  </CardBody>
                </Card>
              </Col>
              : null}
          </Row>
        </>
      );
    } else {
      return <Redirect to='/login' />;
    }
  };
}
