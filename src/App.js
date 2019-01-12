import React, { Component, Fragment } from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
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
        </Switch>
      </Fragment>
    )
  }
}
export default App;
