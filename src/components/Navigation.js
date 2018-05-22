import React, {Component} from 'react';
import Firebase from 'firebase';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
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

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    Firebase.database().ref("users/" + Firebase.auth().currentUser.uid ).on('value', (snapshot) =>
      this.setState(() => ({ user: snapshot.val() }))
    );
  }

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
            Stan konta: {!!user && user.balance.toLocaleString()} PLN
          </span>
        </span>
      </div>
    );
  }
}

const NavigationNonAuth = () => null

export default Navigation;
