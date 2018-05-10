import React from 'react';
import withAuthorization from './withAuthorization';

const Charts = () =>
  <div>
    <h1>Wykresy</h1>
    <p>Tu będzie duży wykres z billboard.js.</p>
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Charts);
