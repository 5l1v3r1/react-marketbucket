import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Alert, Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleLogin from 'react-google-login';



export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        confirmError: false,
        firstName: '',
        lastName: '',
        storeName: '',
        message: '',
        loading: false,
        hasError: false,
        errors: [],
        googleProfile: null
    }
    
    responseGoogle = ( response ) => {
        console.log(response);
        if (response.profileObj) {
            this.setState({
                googleProfile : response.profileObj
            })
        }
    }

    componentDidUpdate = () => {
        const { googleProfile } = this.state
        if (googleProfile) {
            const { givenName, familyName, email } = googleProfile
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1/authorize/google',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    first_name: givenName,
                    last_name: familyName,
                    email: email,
                }
            })
            .then(response => {
                const { data } = response;
                const { message, auth_token } = data
                const user = response.data.user
                
                localStorage.setItem('jwt', auth_token)
                // localStorage.setItem('currentUser', JSON.stringify(user))
                
                this.setState({
                    message: message,
                    confirmError: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({ errors: error.response.data.message, hasError: true, confirmError: false })
            });
            
        }
    }
    
    createUser = (e) => {
        const { password, confirmPassword, firstName, lastName, storeName, email } = this.state
        e.preventDefault()
        if (password === confirmPassword) {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1/users/create',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    store_name: storeName,
                    password: password,
                }
            })
                .then(response => {
                    const { data } = response;
                    const { message, auth_token } = data
                    const user = response.data.user

                    localStorage.setItem('jwt', auth_token)
                    // localStorage.setItem('currentUser', JSON.stringify(user))

                    this.setState({
                        message: message,
                        confirmError: false
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errors: error.response.data.message, hasError: true, confirmError: false })
                });
        } else {
            this.setState({ confirmError: true })
        }
    }

    handleInput = (event) => {
        const field = event.target.name
        const value = event.target.value

        this.setState({
            [field]: value
        })
    }

    render() {
        if (localStorage.getItem('jwt')) {
            return <Redirect to='/' />
        }
        else {
            return (
                <section className="h-100" id="login-page">
                    <Container fluid className="h-100">
                        <Row className="h-100">

                            <Col md="4" className="h-100 d-flex align-items-start flex-column" id="login-left-banner">
                                {this.state.hasError === true ? this.state.errors.map((errors, index) =>
                                    <div className="mt-1 ml-5 mr-5 mb-0">
                                        <small>
                                            <Alert color='danger' key={index}>{errors}</Alert>
                                        </small>
                                    </div>)
                                    : ''}
                                <div className="mt-3 ml-5 mr-5 mb-0">
                                    <h1>Sign Up</h1>
                                    <p>Hello! Welcome to MarketBucket! Let's get started by creating your account!</p>
                                </div>

                                <Form className="mb-1 w-100 pl-5 pr-5 pb-5 pt-1" onSubmit={this.createUser}>
                                    <FormGroup>
                                        <Input onInput={this.handleInput}
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="firstName"
                                            placeholder="First Name"
                                            required
                                        />
                                        <Input onChange={this.handleInput}
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="lastName"
                                            placeholder="Last Name"
                                            required
                                        />
                                        <Input onChange={this.handleInput}
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="email"
                                            type='email'
                                            placeholder="Email"
                                            required
                                        />
                                        <Input onChange={this.handleInput}
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="storeName"
                                            placeholder="Store Name"
                                            required
                                        />
                                        <Input onChange={this.handleInput}
                                            type='password'
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="password"
                                            placeholder="Password"
                                            required
                                        />
                                        <Input onChange={this.handleInput}
                                            type='password'
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            required
                                        />
                                        {this.state.confirmError ? <small style={{ color: "red" }}>Passwords don't match</small> : ""}

                                        <div className="d-flex flex-row mt-3 ml-1">
                                            <Button className="btn btn-dark mr-2" value="Login" type="submit">
                                                Sign Up
                                            </Button>
                                            <GoogleLogin
                                                clientId="34836066236-566duqgasugg0lohgjqhfcd10mah277j.apps.googleusercontent.com"
                                                buttonText="Sign up with Google"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                            />
                                        </div>
                                    </FormGroup>
                                </Form>

                                <div className="mt-auto mx-auto mb-3">
                                    <small className="text-muted">
                                        Already have an account? Login&nbsp;
                                        <Link to={'/login'} className="text-muted border-bottom">
                                            here!
                                        </Link>
                                    </small>
                                </div>
                            </Col>

                            <Col md="8" className="h-100 d-none d-md-block" id="login-left-banner">
                                <div className="mb-auto mt-3">
                                    <img className="float-right" src="https://s3.amazonaws.com/market.bucket/1.11556.Screenshot_2019-01-08_at_21.01.12.jpg" alt="logo" height="80vh" />
                                    <img className="float-right" src="https://s3.amazonaws.com/market.bucket/MARKETPLACE.png" alt="marketplaces" height="" />
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </section>
            )
        }
    }
}


