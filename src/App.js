import React, { Component, Fragment } from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faIgloo)

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/"
            component={props =>
              <Dashboard {...props} />
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
        </Switch>
      </Fragment>
    )
  }
}
export default App;
