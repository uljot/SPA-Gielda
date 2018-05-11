import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOut from './SignOut';
import * as routes from '../constants/routes';

var navBar = {
	paddingTop: "15px",
	paddingBottom: "15px",
	backgroundColor: "#000000",
	textDecoration: "none",
};

var navRegular = {
	padding: "0px 15px 0px 15px",
	textDecoration: "none",
	color: "#999999"
};

var navActive = {
	color: "#ffffff"
};

var rightSide = {
	color: "#999999",
	padding: "0px 15px 0px 15px",
	textDecoration: "none",
	float: "right"
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
      <span style={rightSide}>
		<SignOut />
	  </span>
      <span style={rightSide}>
		USERNAME
	  </span>
      <span style={rightSide}>
		Stan konta:
	  </span>
  </div>

const NavigationNonAuth = () => null

export default Navigation;
