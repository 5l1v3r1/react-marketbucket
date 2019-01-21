import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import AddProductsFormLazada from '../components/AddProductsFormLazada';
import ErrorHandler from './Error';


export default class LazadaAddProducts extends Component {
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
            if (localStorage.getItem('lazadaToken') && localStorage.getItem('lazadaToken') !== 'null') {
                return (
                    // Lazada add products SECTION
                    <section className="h-100" id="lazada-new-product">
                        <Container fluid>
                            <Row className='d-flex'>
                                <SideNavbar currentUrl={currentUrl} logout={this.logout} />
                                <AddProductsFormLazada />
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