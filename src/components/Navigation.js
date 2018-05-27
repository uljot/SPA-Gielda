import React from 'react';
import Firebase from 'firebase';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import { Load } from './Load';

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

class NavigationAuth extends Load {

  render() {
    const { user } = this.state;

    return (
      <div style={navBar}>
        <NavLink activeStyle={navActive} style={navRegular} to={routes.DASHBOARD}>KOKPIT</NavLink>
        <NavLink activeStyle={navActive} style={navRegular} to={routes.CHARTS}>Wykresy</NavLink>
        <NavLink activeStyle={navActive} style={navRegular} to={routes.RATES}>Kursy</NavLink>
        <NavLink style={rightSide} to={routes.GOODBYE} onClick={() => Firebase.auth().signOut()}>Wyloguj</NavLink>
        <span>
          <span style={rightSide}>
            {!!user && user.username}
          </span>
          <span style={rightSide}>
            Stan konta: {!!user && user.balance.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN
          </span>
        </span>
      </div>
    );
  }
}

const NavigationNonAuth = () => null

export default Navigation;
