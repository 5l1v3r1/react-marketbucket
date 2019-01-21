import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import ShopeeProducts from '../components/ShopeeProducts';
import ErrorHandler from './Error';


export default class ShopeeShop extends Component {
    state = {
        currentUrl: this.props.match.path
    }

    logout = (e) => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('lazadaToken')
        localStorage.removeItem('lazadaRefresh')
        localStorage.removeItem('shopeeShopId')
        // this.forceUpdate()
    }

    render() {
        const { currentUrl } = this.state
        if (localStorage.getItem('jwt')) {
            if (localStorage.getItem('shopeeShopId') !== 'null') {
                return (
                    //Shopee Shop SECTION
                    <section className="h-100" id="shopee-shop">
                        <Container fluid>
                            <Row>
                                <SideNavbar currentUrl={currentUrl} logout={this.logout} />
                                <ShopeeProducts />
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