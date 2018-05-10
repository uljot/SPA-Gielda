import React from 'react';

import withAuthorization from './withAuthorization';
import SignOutButton from './SignOut';

const Dashboard = () =>
  <div>
    <h1>Kokpit</h1>
    <p>Tutaj będą małe wykresiki.</p>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
