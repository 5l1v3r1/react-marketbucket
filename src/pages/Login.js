import React, { Component } from 'react'
import { Alert, Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import GoogleLogin from 'react-google-login';


export default class Login extends Component {
    state = {
        email: "",
        password: "",
        isLoading: false,
        hasError: false,
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

    handleSubmit = (e) => {
        e.preventDefault()
        const validateEmail = EmailValidator.validate(this.state.email)
        if (validateEmail) {
            axios.post('http://localhost:5000/api/v1/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                const { data } = response;
                const { auth_token, lazada_token, lazada_refresh, shop_id } = data

                localStorage.setItem('jwt', auth_token)
                // localStorage.setItem('currentUser', JSON.stringify(user))

                localStorage.setItem('lazadaToken', lazada_token)
                localStorage.setItem('lazadaRefresh', lazada_refresh)
                localStorage.setItem('shopeeShopId', shop_id)
                
                    this.setState({
                        isLoading: false,
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ hasError: true })
                });
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    handleInput = (event) => {
        const field = event.target.name
        const value = event.target.value

        this.setState({
            [field]: value
        })
    }

    componentDidUpdate = () => {
        const { googleProfile } = this.state
        if (googleProfile) {
            const { email } = googleProfile
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/api/v1/authorize/google',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    email: email,
                }
            })
            .then(response => {
                const { data } = response;
                const { message, auth_token, lazada_token, lazada_refresh, shop_id } = data
                
                localStorage.setItem('jwt', auth_token)
                // localStorage.setItem('currentUser', JSON.stringify(user))
                
                localStorage.setItem('lazadaToken', lazada_token)
                localStorage.setItem('lazadaRefresh', lazada_refresh)
                localStorage.setItem('shopeeShopId', shop_id)
                
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
    
    render() {
        if (localStorage.getItem('jwt')) {
            return <Redirect to='/' />;
        }
        else {
            return (
                // LOGIN SECTION
                <section className="h-100" id="login-page">
                    <Container fluid className="h-100">
                        <Row className="h-100">

                            <Col md="4" className="h-100 d-flex align-items-start flex-column mb-auto mt-auto" id="login-right-banner">
                                {this.state.hasError ?
                                    <div className="mt-1 ml-5 mr-5 mb-0">
                                        <small>
                                            <Alert color='danger'>The email and Password don't match</Alert>
                                        </small>
                                    </div>
                                    : ''}
                                <div className="mt-3 ml-5 mr-5 mb-0">
                                    <h1>Login</h1>
                                    <p>Hello! Let's get started!</p>
                                </div>
                                <Form className="mb-1 w-100 pl-5 pr-5 pb-5 pt-1" onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="email"
                                            type='email'
                                            autoComplete="email"
                                            placeholder="email"
                                            // value={this.state.email}
                                            onInput={this.handleInput}
                                            required
                                        />
                                        <Input
                                            className="form-control border-top-0 border-left-0 border-right-0 bg-transparent"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            placeholder="password"
                                            // value={this.state.password}
                                            onInput={this.handleInput}
                                            required
                                        />
                                        <div className="d-flex flex-row mt-3 ml-1">
                                            <Button className="btn btn-dark mr-2" value="Login">
                                                Login
                                            </Button>
                                            <GoogleLogin
                                                clientId="34836066236-566duqgasugg0lohgjqhfcd10mah277j.apps.googleusercontent.com"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                            />
                                        </div>
                                    </FormGroup>
                                </Form>

                                <div className="mt-auto mx-auto mb-3">
                                    <small className="text-muted">
                                        Don't have an account yet? Sign up&nbsp;
                                        <Link to={'/signup'} className="text-muted border-bottom">
                                            here!
                                        </Link>
                                    </small>
                                </div>
                            </Col>
                            <Col md="7" className="h-100 d-none d-md-block mt-auto mb-auto" id="login-left-banner" >
                                <div className="mb-auto mt-3">
                                    <img className="float-right" src="https://s3.amazonaws.com/market.bucket/1.11556.Screenshot_2019-01-08_at_21.01.12.jpg" alt="logo" height="80vh" />
                                    <img className="float-right" src="https://s3.amazonaws.com/market.bucket/MARKETPLACE1.png" alt="marketplaces" height="500px" width='100%'/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                // /LOGIN SECTION  
            )
        }

    }
}


