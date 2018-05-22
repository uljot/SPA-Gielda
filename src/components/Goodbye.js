import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const Goodbye = () =>
  <div>
    <h1>Wylogowano</h1>
    <p>Dziękujemy za wspólną przygodę</p>
    <p>Zapraszamy ponownie</p>
    <p><NavLink to={routes.SIGN_IN}>Zaloguj się</NavLink></p>
  </div>

export default withRouter(Goodbye);
