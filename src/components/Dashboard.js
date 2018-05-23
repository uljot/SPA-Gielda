import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { Load } from './Load';

class Dashboard extends Load {
  render() {
    const { user } = this.state;
    const { currentRates } = this.state;

    var sums = user ? currentRates ?
      Object.keys(user.wallet).reduce(function (result, item) {
        return {
          value: result.value + user.wallet[item].value,
          sellValue: result.sellValue + (currentRates[item].bid ? currentRates[item].bid * user.wallet[item].amount : currentRates[item].mid * user.wallet[item].amount)
        };
      }, {value: 0, sellValue: 0})
    : null : null;

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
                <th>Nazwa</th>
                <th>Symbol</th>
                <th>Kurs średni</th>
                <th>Wartość zakupu</th>
                <th>Ilość</th>
                <th>Wartość sprzedaży</th>
                <th>Zysk/strata</th>
              </tr>
            </thead>
            <tbody>
            {user ? currentRates ?
              Object.keys(user.wallet).map(function(key, index) {
                return user.wallet[key].amount > 0 ?
                  <TableBuilder key={index}
                                name={currentRates[key].currency}
                                code={key}
                                mid={currentRates[key].mid}
                                value={user.wallet[key].value}
                                amount={user.wallet[key].amount}
                                sellValue={currentRates[key].bid ? currentRates[key].bid * user.wallet[key].amount : currentRates[key].mid * user.wallet[key].amount}
                  />
                  : null
              })
            : null : null}
            </tbody>
            <tfoot>
              <tr>
                <td>SUMA</td>
                <td></td>
                <td></td>
                <td>{!!sums && sums.value.toLocaleString('pl-PL', { minimumFractionDigits: 2 })}</td>
                <td></td>
                <td>{!!sums && sums.sellValue.toLocaleString('pl-PL', { minimumFractionDigits: 2 })}</td>
                <td>{!!sums && (sums.sellValue - sums.value).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}({!!sums && (((sums.sellValue / sums.value) - 1) * 100).toFixed(2).replace(".",",")}%)</td>
              </tr>
            </tfoot>
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
    const { value } = this.props;
    const { amount } = this.props;
    const { sellValue } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{code}</td>
        <td>{mid.toString().replace(".",",")}</td>
        <td>{value.toLocaleString('pl-PL', { minimumFractionDigits: 2 })}</td>
        <td>{amount.toLocaleString()}</td>
        <td>{sellValue.toLocaleString('pl-PL', { minimumFractionDigits: 2 })}</td>
        <td>{(sellValue - value).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}({(((sellValue / value) - 1) * 100).toFixed(2).replace(".",",")}%)</td>
      </tr>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
