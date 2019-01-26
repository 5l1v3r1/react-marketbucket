import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import AddProductsFormLazada from '../components/AddProductsFormLazada';
import AddProductsFormShopee from '../components/AddProductsFormShopee';
import ErrorHandler from './Error';


export default class AllAddProducts extends Component {
  state = {
    currentUrl: this.props.match.path,
    name: "",
    description: "",
    price: null,
    quantity: null,
    packageWeight: null,
    file: null
  }

  handleSharedInput = (event) => {
    const field = event.target.name
    const value = event.target.value
    this.setState({
      [field]: value
    })
  }
  getImage = (event) => {
    const file = event.target.files[0]
    this.setState({ file })
  }

  logout = (event) => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('lazadaToken')
    localStorage.removeItem('lazadaRefresh')
    localStorage.removeItem('shopeeShopId')
  }

  render() {
    const { currentUrl, name, description, packageWeight, price, quantity, file } = this.state
    if (localStorage.getItem('jwt')) {
      if (localStorage.getItem('lazadaToken') && localStorage.getItem('lazadaToken') !== 'null'
        && localStorage.shopeeShopId && localStorage.shopeeShopId !== 'null') {
        return (
          // All add products SECTION
          <section className="h-100" id="all-new-product">
            <Container fluid>
              <Row className='d-flex'>
                <SideNavbar currentUrl={currentUrl} logout={this.logout} />
                <Col md='5'>
                  <AddProductsFormLazada all={true} file={file} name={name} description={description} packageWeight={packageWeight} price={price} quantity={quantity} handleSharedInput={this.handleSharedInput} getImage={this.getImage} />
                </Col>
                <Col md='4'>
                  <AddProductsFormShopee all={true} file={file} name={name} description={description} packageWeight={packageWeight} price={price} quantity={quantity} handleSharedInput={this.handleSharedInput} getImage={this.getImage} />
                </Col>
              </Row>
            </Container>
          </section>
        )
      } else {
        return <ErrorHandler marketplace_name={'one of our marketplaces'} />
      }
    }
    else {
      return (<Redirect to='/login' />)
    }
  }
}