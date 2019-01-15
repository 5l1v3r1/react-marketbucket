import React, { Component } from 'react'
import SideNavbar from '../components/SideNavbar';
import { Container, Row } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'


export default class LazadaShop extends Component {
  state = {

  }

  render () {
      const {currentUrl} = this.props    
        
      if (localStorage.getItem('jwt') ) {
          return(    
              // Lazada Shop SECTION
              <section className="h-100" id="lazada-shop"> 
                  <Container fluid>
                      <Row>
                          <SideNavbar currentUrl={currentUrl} logout={this.logout}/>
                          {/* <  /> */}
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