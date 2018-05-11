import React from 'react';
import withAuthorization from './withAuthorization';

const Rates = () =>
  <div>
    <h1>Kursy</h1>
    <p>Tu będzie strona z kursami, umożliwiająca transkacje.</p>
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Rates);
