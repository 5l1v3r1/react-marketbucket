import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Collapse, Col, Alert } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class SettingsOptions extends Component {
  state = {
    userCollapse: true,
    marketplaceCollapse: false,
    passwordCollapse: false,
    firstName: "",
    lastName: "",
    email: "",
    storeName: "",
    password: "",
    passwordConfirm: "",
    user: null,
    hasError: false,
    errors: [],
    confirmError: false,
    message: null,
    lazada: localStorage.lazadaToken === "null" ? null : localStorage.lazadaToken,
    shopee: localStorage.shopeeShopId === "null" ? null : localStorage.shopeeShopId,
    marketplaceName: "",
    redirect: false
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/users/me',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
    })
      .then(response => {
        const { data } = response;
        this.setState({ user: data })
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, storeName, password, passwordConfirm, user } = this.state
    if (password === passwordConfirm) {
      axios({
        method: 'put',
        url: 'http://127.0.0.1:5000/api/v1/users/update',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${localStorage.jwt}`
        },
        data: {
          first_name: firstName ? firstName : user.first_name,
          last_name: lastName ? lastName : user.last_name,
          email: email ? email : user.email,
          store_name: storeName ? storeName : user.store_name,
          password: password ? password : null
        }
      })
        .then(response => {
          const { message } = response.data;
          setTimeout(() => this.setState({ redirect: true }), 3000)
          this.setState({ message, confirmError: false, hasError: false })
        })
        .catch(error => {
          this.setState({ errors: error.response.data.message, hasError: true, confirmError: false })
        });
    } else {
      this.setState({ confirmError: true })
    }
  }

  togglePassword = () => {
    this.setState({
      passwordCollapse: !this.state.passwordCollapse,
    })
  }
  toggle = () => {
    this.setState({
      marketplaceCollapse: !this.state.marketplaceCollapse,
      userCollapse: !this.state.userCollapse,
      passwordCollapse: false
    });
  }
  handleInput = (e) => {
    const field = e.target.name
    const value = e.target.value
    this.setState({
      [field]: value
    })
  }

  handleDelete = ({ target }) => {
    const marketplaceName = target.name
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:5000/api/v1/marketplaces/delete',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
      data: {
        marketplace_name: marketplaceName
      }
    })
      .then(response => {
        const { message } = response.data;
        if (marketplaceName === 'lazada') {
          localStorage.removeItem('lazadaToken')
        } else {
          localStorage.removeItem('shopeeShopId')
        }
        setTimeout(() => this.setState({ redirect: true }), 2000)
        this.setState({ message, hasError: false })
      })
      .catch(error => {
        this.setState({ errors: error.response.data.message, hasError: true, confirmError: false })
      });

  }

  render() {
    const { user, firstName, lastName, email, storeName, password, passwordConfirm, lazada, shopee, message, redirect } = this.state
    if (redirect) {
      return <Redirect to='/' />;
    } else {
      return (
        user ?
          <>
            <Col md="9" className="d-none d-md-block sidebar mb-auto ml-1 mr-1 mt-5">

              <div>
                {message ? <Alert color='info'>{message}</Alert> : null}
                <Button onClick={this.toggle} style={{ marginBottom: '1rem', width: "100%" }}>Edit User Details</Button>
                <Collapse isOpen={this.state.userCollapse}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input placeholder={user.first_name} value={firstName} label='First Name' onInput={this.handleInput} name='firstName' />
                    <Form.Input placeholder={user.last_name} value={lastName} label='Last Name' onInput={this.handleInput} name='lastName' />
                    <Form.Input placeholder={user.email} value={email} label='Email' type='email' onInput={this.handleInput} name='email' />
                    <Form.Input placeholder={user.store_name} value={storeName} label='Store Name' onInput={this.handleInput} name='storeName' />
                    <Button type='button' onClick={this.togglePassword} style={{ marginBottom: '1rem', width: "40%" }}>Do you want to change your password?</Button>
                    <Collapse isOpen={this.state.passwordCollapse}>
                      <Form.Group widths='equal'>
                        <Form.Input type='password' value={password} placeholder="Enter New Password" onInput={this.handleInput} name='password' />
                        <Form.Input type='password' value={passwordConfirm} placeholder="Confirm New Password" onInput={this.handleInput} name='passwordConfirm' />
                      </Form.Group>
                      {this.state.confirmError ? <small style={{ color: "red" }}>Passwords don't match</small> : ""}
                    </Collapse>
                    <div>
                      <Button className='mt-2' color='blue' type='submit'>Submit</Button>
                    </div>
                  </Form>
                  {this.state.hasError === true ? this.state.errors.map((errors, index) =>
                    <div key={index} className="mt-1 ml-0 mr-0 mb-0">
                      <small>
                        <Alert color='danger'>{errors}</Alert>
                      </small>
                    </div>)
                    : ''}
                </Collapse>
              </div>
              <div className='mt-5'>
                <Button onClick={this.toggle} style={{ marginBottom: '1rem', width: "100%" }}>Marketplace Settings</Button>
                <Collapse isOpen={this.state.marketplaceCollapse}>
                  <Form>
                    <Form.Group widths='equal'>
                      {lazada ? <Button type="button" color="red" name='lazada' onClick={this.handleDelete} style={{ marginBottom: '1rem', width: "50%" }}>DELETE LAZADA</Button> : null}
                      {shopee ? <Button type="button" color="red" name='shopee' onClick={this.handleDelete} style={{ marginBottom: '1rem', width: "50%" }}>DELETE SHOPEE</Button> : null}
                    </Form.Group>
                  </Form>
                </Collapse>
              </div>
            </Col>
          </> : <Col md='3' className='mb-5 ml-5 mr-auto mt-5'><Alert color='info'>Loading...</Alert></Col>
      )
    };
  }
}

