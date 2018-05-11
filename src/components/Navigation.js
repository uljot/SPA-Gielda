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
      <NavLink to={routes.DASHBOARD}>Kokpit</NavLink>
      <NavLink to={routes.CHARTS}>Wykresy</NavLink>
      <NavLink to={routes.RATES}>Kursy</NavLink>
      <SignOutButton />
  </div>

const NavigationNonAuth = () => null

export default Navigation;
