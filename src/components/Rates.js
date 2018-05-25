import React from 'react';

import withAuthorization from './withAuthorization';
import { Load } from './Load';

class Rates extends Load {
  render() {
    const { currentRates } = this.state;
    const { lastRates } = this.state;
	return (
      <div>
        <style> {`
          table, td, th {
            border: 2px ridge white;
          }
          table {
            width: 100%;
          }
        `}</style>
        <div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>*</th>
                <th>Nazwa</th>
                <th>Symbol</th>
                <th>Kurs średni</th>
                <th>Kurs zakupu</th>
                <th>Kurs sprzedaży</th>
                <th>Zmiana procentowa</th>
                <th>Transakcja</th>
                <th>Ilość</th>
                <th>Kwota</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Rates);
