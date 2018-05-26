import React from 'react';
import { withRouter } from 'react-router-dom';
/*import { Redirect } from 'react-router'*/

import AuthUserContext from './AuthUserContext';
/*import * as routes from '../constants/routes';*/

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    render() {
      return (
        <AuthUserContext.Consumer>
          {// eslint-disable-next-line
		  authUser => authUser ? <Component /> : null/* routes.noAuthRoutes.includes(window.location.pathname) ? null : <Redirect to={routes.SIGN_IN} />*/}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
