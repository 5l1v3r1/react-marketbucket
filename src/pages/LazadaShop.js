import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import LazadaProducts from '../components/LazadaProducts';


export default class LazadaShop extends Component {
  state = {
    currentUrl: this.props.match.path
  }

  render () {
      const {currentUrl} = this.state    
      if (localStorage.getItem('jwt') ) {
          return(    
              // Lazada Shop SECTION
              <section className="h-100" id="lazada-shop"> 
                  <Container fluid>
                      <Row>
                          <SideNavbar currentUrl={currentUrl} logout={this.props.logout}/>
                          <LazadaProducts />
                      </Row>
                  </Container>
              </section>
          )
      }
      else{
          return (<Redirect to='/login'/>)
      }
  }
}