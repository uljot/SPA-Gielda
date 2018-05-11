import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () => 
  <div>
    <ul>
      <li><NavLink to={routes.DASHBOARD}>Kokpit</NavLink></li>
      <li><NavLink to={routes.CHARTS}>Wykresy</NavLink></li>
      <li><NavLink to={routes.RATES}>Kursy</NavLink></li>
      <li><SignOutButton /></li>
    </ul>
  </div>

const NavigationNonAuth = () => null

export default Navigation;
