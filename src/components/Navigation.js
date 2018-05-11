import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOut from './SignOut';
import * as routes from '../constants/routes';

var navBar = {
	backgroundColor: "#000000",
	textDecoration: "none",
	color: "#ffffff"
};

var navRegular = {
	textDecoration: "none",
	color: "#999999"
};

var navActive = {
	textDecoration: "none",
	color: "#ffffff"
};

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () => 
  <div style={navBar}>
      <NavLink activeStyle={navActive} style={navRegular} to={routes.DASHBOARD}>KOKPIT</NavLink>
      <NavLink activeStyle={navActive} style={navRegular} to={routes.CHARTS}>Wykresy</NavLink>
      <NavLink activeStyle={navActive} style={navRegular} to={routes.RATES}>Kursy</NavLink>
      <SignOut />
  </div>

const NavigationNonAuth = () => null

export default Navigation;
