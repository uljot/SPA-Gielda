import React from 'react';

import withAuthorization from './withAuthorization';
import SignOutButton from './SignOut';

const Dashboard = () =>
  <div>
    <h1>Dashboard</h1>
    <p>The Dashboard is accessible by every signed in user.</p>
    <p><SignOutButton /></p>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);

