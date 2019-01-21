import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import AddProductsFormShopee from '../components/AddProductsFormShopee';
import ErrorHandler from './Error';


export default class ShopeeAddProducts extends Component {
    state = {
        currentUrl: this.props.match.path
    }

    logout = (e) => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('lazadaToken')
        localStorage.removeItem('lazadaRefresh')
        localStorage.removeItem('shopeeShopId')
    }

    render() {
        const { currentUrl } = this.state
        if (localStorage.getItem('jwt')) {
            if (localStorage.shopeeShopId && localStorage.shopeeShopId !== 'null') {
                return (
                    // shopee add products SECTION
                    <section className="h-100" id="shopee-new-product">
                        <Container fluid>
                            <Row className='d-flex'>
                                <SideNavbar currentUrl={currentUrl} logout={this.logout} />
                                <AddProductsFormShopee />
                            </Row>
                        </Container>
                    </section>
                )
            } else {
                return <ErrorHandler marketplace_name={'Shopee'} />
            }
        }
        else {
            return (<Redirect to='/login' />)
        }
    }
}