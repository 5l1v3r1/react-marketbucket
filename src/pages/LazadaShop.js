import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import LazadaProducts from '../components/LazadaProducts';
import ErrorHandler from './Error';


export default class LazadaShop extends Component {
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
            if (localStorage.getItem('lazadaToken') && localStorage.getItem('lazadaToken') !== 'null') {
                return (
                    // Lazada Shop SECTION
                    <section className="h-100" id="lazada-shop">
                        <Container fluid>
                            <Row className='d-flex'>
                                <SideNavbar currentUrl={currentUrl} logout={this.logout} />
                                <LazadaProducts />
                            </Row>
                        </Container>
                    </section>
                )
            } else {
                return <ErrorHandler marketplace_name={'Lazada'} />
            }
        }
        else {
            return (<Redirect to='/login' />)
        }
    }
}