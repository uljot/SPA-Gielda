import React from 'react';
import withAuthorization from './withAuthorization';

const Charts = () =>
  <div>
    <h1>CHARTS</h1>
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Charts);
