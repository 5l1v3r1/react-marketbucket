import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import SideNavbar from '../components/SideNavbar'
import Dashboard from '../components/Dashboard';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import SettingsOptions from '../components/SettingsOptions';

export default class Settings extends Component {
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
      return (
        // Dashboard SECTION
        <section className="h-100" id="dashboard">
          <Container fluid>
            <Row>
              <SideNavbar currentUrl={currentUrl} logout={this.logout} />
              <SettingsOptions />
            </Row>
          </Container>
        </section>
      )
    }
    else {
      return <Redirect to='/login' />;
    }

  }
}


