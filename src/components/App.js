import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignInPage from './SignIn';

import * as routes from '../constants/routes';

const App = () =>
  <Router>
    <div>
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
    </div>
  </Router>

export default App;
