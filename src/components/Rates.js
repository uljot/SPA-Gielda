import React, { Component } from 'react';

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
                <th>Zmiana</th>
                <th>Transakcja</th>
                <th>Ilość</th>
                <th>Kwota</th>
              </tr>
            </thead>
            <tbody>
			  {currentRates ? lastRates ?
                Object.keys(currentRates).map(function(key, index) {
                  return <TableBuilder key={index}
                                       name={currentRates[key].currency}
                                       code={key}
                                       mid={currentRates[key].mid}
                                       oldMid={lastRates[key].mid}
                                       bid={currentRates[key].bid}
                                       ask={currentRates[key].ask}
                         />
                })
            : null : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class TableBuilder extends Component {
  render() {
    const { name } = this.props;
    const { code } = this.props;
    const { mid } = this.props;
    const { oldMid } = this.props;
    const { bid } = this.props;
    const { ask } = this.props;

    return (
      <tr>
        <td>#</td>
        <td>{name}</td>
        <td>{code}</td>
        <td>{mid.toString().replace(".",",")}</td>
        <td>{bid ? bid.toString().replace(".",",") : "B/D"}</td>
        <td>{ask ? ask.toString().replace(".",",") : "B/D"}</td>
        <td>{(mid - oldMid).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 6})}({((mid / oldMid - 1) * 100).toFixed(2).replace(".",",")}%)</td>
        <td>#</td>
        <td>#</td>
        <td>#</td>
      </tr>
    );
  }
}

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Rates);
