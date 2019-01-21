import React, { Component } from 'react';
import { Col, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'


export default class SideNavbar extends Component {


  render() {
    const { currentUrl } = this.props

    return (
      <Col md="2" className="d-none d-md-block sidebar mb-auto ml-1 mr-1 mt-5">
        <div className="sidebar-sticky">
          <Nav className="flex-column">
            <NavItem className={`${currentUrl === '/' ? 'bg-primary' : ''}`} >
              <Link to={'/'} className={`nav-link ${currentUrl === '/' ? 'text-white' : ''}`}>
                <span data-feather="home" ></span>
                Dashboard<span className="sr-only">(current)
                </span>
              </Link>
            </NavItem>
            {localStorage.lazadaToken && localStorage.lazadaToken !== "null" ?
              <NavItem className={`${currentUrl === '/lazada/shop' ? 'bg-primary' : ''}`} >
                <Link to={'/lazada/shop'} className={`nav-link ${currentUrl === '/lazada/shop' ? 'text-white' : ''}`}>
                  <span data-feather="home"></span>
                  Lazada<span className="sr-only">(current)
                </span>
                </Link>
              </NavItem> : null}
            {localStorage.shopeeShopId && localStorage.shopeeShopId !== "null" ?
              <NavItem className={`${currentUrl === '/shopee/shop' ? 'bg-primary' : ''}`} >
                <Link to={'/shopee/shop'} className={`nav-link ${currentUrl === '/shopee/shop' ? 'text-white' : ''}`}>
                  <span data-feather="home"></span>
                  Shopee<span className="sr-only">(current)
                </span>
                </Link>
              </NavItem> : null}
            <NavItem className={`${currentUrl === '/settings' ? 'bg-primary' : ''}`} >
              <Link to={'/settings'} className={`nav-link ${currentUrl === '/settings' ? 'text-white' : ''}`}>
                <span data-feather="home"></span>
                Settings<span className="sr-only">(current)
                </span>
              </Link>
            </NavItem>
          </Nav>
          <Nav className="flex-column mb-2">
            <NavItem>
              <Link to={'/login'} onClick={this.props.logout} className="nav-link bg-transparent border-0">Log out</Link>
            </NavItem>
          </Nav>

        </div>
      </Col>
    )
  }

}



