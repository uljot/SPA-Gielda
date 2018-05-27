import React, { Component } from 'react';
import Firebase from 'firebase';

import withAuthorization from './withAuthorization';
import { Load } from './Load';

class Rates extends Load {
  render() {
    const { currentRates } = this.state;
    const { lastRates } = this.state;
    const { user } = this.state;
	return (
      <div>
        <style> {`
          table {
            width: 100%;
			border-spacing: 0px;
			padding: 4px;
          }
		  th, thead tr {
		    border: 2px ridge white;
		  }
          .rise, .rise td {
            background-color: #00BB00;
	        border-bottom: 2px double #008800;
          }
          .drop, .drop td {
            background-color: #BB0000;
            border-bottom: 2px double #880000;
			color: #BBBBBB;
          }
          .noChange, .noChange td {
            background-color: #BBBBBB;
            border-bottom: 2px double #008800;
          }
		  .formItem {
            margin:auto;
            display:block;
		  }
		  .dropNumberField {
		    font-weight: 999;
          }
		  .riseNumberField {
		    font-weight: bold;
          }
		  .numberField {
			letter-spacing: 1px;
			padding-left: 2px;
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
			  {currentRates ? lastRates ? user ?
                Object.keys(user.follow).map(function(key, index) {
                  return <TableBuilder key={key}
                                       name={currentRates[key].currency}
                                       code={key}
                                       mid={currentRates[key].mid}
                                       oldMid={lastRates[key].mid}
                                       bid={currentRates[key].bid}
                                       ask={currentRates[key].ask}
                                       follow={true}
									   uid={user.uid}
                         />
                })
            : null : null : null}
			  {currentRates ? lastRates ? user ?
                Object.keys(currentRates).map(function(key, index) {
                  return user.follow[key] ? null
                                          : <TableBuilder key={key}
                                                          name={currentRates[key].currency}
                                                          code={key}
                                                          mid={currentRates[key].mid}
                                                          oldMid={lastRates[key].mid}
                                                          bid={currentRates[key].bid}
                                                          ask={currentRates[key].ask}
                                                          follow={false}
									                      uid={user.uid}
                                            />
                })
            : null : null : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class TableBuilder extends Component {
  constructor(props) {
    super(props);
    let midDiff = props.mid - props.oldMid;
    let rowClassName = midDiff > 0 ? "rise" : midDiff < 0 ? "drop" : "noChange";
    this.state = {
	  midDiff: midDiff,
	  rowClassName: rowClassName,
	  selectClassName: rowClassName.concat(" formItem"),
	  numberFieldClassName: (midDiff > 0 ? "rise riseNumberField" : midDiff < 0 ? "drop dropNumberField" : "noChange").concat(" numberField formItem")
    }
  }

  render() {
    const { name } = this.props;
    const { code } = this.props;
    const { mid } = this.props;
    const { oldMid } = this.props;
    const { bid } = this.props;
    const { ask } = this.props;
    const { follow } = this.props;
    const { uid } = this.props;

    var onCheckboxAction = () => {
	  if(follow) {
	    Firebase.database().ref("users/" + uid + "/follow/" + code).remove();
	  } else {
	    Firebase.database().ref("users/" + uid + "/follow/" + code).set(true);
	  }
	}

    return (
      <tr className={this.state.rowClassName}>
        <td><input type="checkbox" className={"formItem"} onClick={() => onCheckboxAction()} defaultChecked={follow} /></td>
        <td>{name}</td>
        <td>{code}</td>
        <td>{mid.toString().replace(".",",")}</td>
        <td>{bid ? bid.toString().replace(".",",") : "B/D"}</td>
        <td>{ask ? ask.toString().replace(".",",") : "B/D"}</td>
        <td>{this.state.midDiff.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 6})}({((mid / oldMid - 1) * 100).toFixed(2).replace(".",",")}%)</td>
        <td>
		  <select className={this.state.selectClassName}>
		    <option value="No Action">Brak</option>
            <option value="Buy">Kup</option>
            <option value="Sell">Sprzedaj</option>
          </select>
		</td>
        <td><input type="number" min="1" max="99999999" className={this.state.numberFieldClassName} /></td>
        <td>#</td>
      </tr>
    );
  }
}

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Rates);
