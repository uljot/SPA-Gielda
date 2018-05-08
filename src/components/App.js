import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignInPage from './SignIn';
import Dashboard from './Dashboard';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.DASHBOARD}
        component={() => <Dashboard />}
      />
    </div>
  </Router>

export default withAuthentication(App);
