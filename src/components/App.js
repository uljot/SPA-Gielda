import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import Dashboard from './Dashboard';
import PasswordForgetPage from './PwForget';
import Charts from './Charts';
import Rates from './Rates';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.DASHBOARD}
        component={() => <Dashboard />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.CHARTS}
        component={() => <Charts />}
      />
      <Route
        exact path={routes.RATES}
        component={() => <Rates />}
      />
    </div>
  </Router>

export default withAuthentication(App);
