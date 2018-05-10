import React from 'react';
import { Link } from 'react-router-dom';

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
      <li><Link to={routes.DASHBOARD}>Kokpit</Link></li>
      <li><Link to={routes.CHARTS}>Wykresy</Link></li>
      <li><Link to={routes.RATES}>Kursy</Link></li>
      <li><SignOutButton /></li>
    </ul>
  </div>

const NavigationNonAuth = () => null
  // <ul>
  //   <li><Link to={routes.SIGN_IN}>Zaloguj</Link></li>
  //   <li><Link to={routes.SIGN_UP}>Utwórz konto</Link></li>
  // </ul>

// const Navigation = () =>
//   <div>
//     <ul>
//       <li><Link to={routes.SIGN_IN}>Zaloguj</Link></li>
//       <li><Link to={routes.SIGN_UP}>Zarejestruj</Link></li>
//       <li><Link to={routes.DASHBOARD}>Kokpit</Link></li>
//       <li><Link to={routes.CHARTS}>Wykresy</Link></li>
//       <li><Link to={routes.RATES}>Kursy</Link></li>
//       <li><SignOutButton /></li>
//     </ul>
//   </div>

export default Navigation;
