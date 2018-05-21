import React from 'react';
import Firebase from 'firebase';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import {DataAccess} from './Data';

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
      <NavLink style={rightSide} to={routes.GOODBYE} onClick={() => Firebase.auth().signOut()}>Wyloguj</NavLink>
      <AuthUserContext.Consumer>
        {
        authUser =>
            <span>
              <span style={rightSide}>
                <DataAccess from={"users/" + authUser.uid + "/username"} />
              </span>
              <span style={rightSide}>
                Stan konta: <DataAccess from={"users/" + authUser.uid + "/balance"} /> PLN
              </span>
            </span>
        }
      </AuthUserContext.Consumer>
  </div>

const NavigationNonAuth = () => null

export default Navigation;
