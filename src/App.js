import React, { Component, Fragment } from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import LazadaShop from './pages/LazadaShop';
import ShopeeShop from './pages/ShopeeShop';
import Home from './pages/Home';

library.add(faPlus, faIgloo, faGoogle)

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/"
            component={props =>
              <Home {...props} />
            }>
          </Route>
          <Route path="/signup"
            component={props =>
              <SignUp {...props} />
            }>
          </Route>
          <Route path="/login"
            component={props =>
              <Login {...props} />
            }>
          </Route>
          <Route path="/lazada/shop"
            component={props =>
              <LazadaShop {...props} />
            }>
          </Route>
          <Route path="/shopee/shop"
            component={props =>
              <ShopeeShop {...props} />
            }>
          </Route>
        </Switch>
      </Fragment>
    )
  }
}
export default App;
