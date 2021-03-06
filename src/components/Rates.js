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
            border-bottom: 2px double #FF6666;
			color: #BBBBBB;
          }
          .buy, .buy td {
            background-color: #FFD966;
            border-bottom: 2px double #D19D00;
			color: #000000;
          }
          .sell, .sell td {
            background-color: #0000FF;
            border-bottom: 2px double #519480;
			color: #9AC7BF;
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
		  .numberField {
		    font-weight: bold;
			letter-spacing: 1px;
			padding-left: 2px;
          }
		  .valueField {
			border-style: none;
          }
        `}</style>
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
                <th>*</th>
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
									   currentAmount={user.wallet[key] ? user.wallet[key].amount : 0}
									   currentValue={user.wallet[key] ? user.wallet[key].value : 0}
									   currentBalance={user.balance}
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
									                      currentAmount={user.wallet[key] ? user.wallet[key].amount : 0}
									                      currentValue={user.wallet[key] ? user.wallet[key].value : 0}
									                      currentBalance={user.balance}
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
	let numberFieldClassName = (midDiff > 0 ? "rise" : midDiff < 0 ? "drop dropNumberField" : "noChange").concat(" numberField formItem");
    this.state = {
	  midDiff: midDiff,
	  inputDisabled: true,
	  checkboxDisabled: false,
	  numberField: "",
	  valueField: "",
	  rowClassName: rowClassName,
	  selectClassName: rowClassName.concat(" formItem"),
	  numberFieldClassName: numberFieldClassName,
	  valueFieldClassName: numberFieldClassName.concat(" valueField")
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
    const { currentAmount } = this.props;
    const { currentValue } = this.props;
    const { currentBalance } = this.props;

    var onCheckboxAction = () => {
	  if(follow) {
	    Firebase.database().ref("users/" + uid + "/follow/" + code).remove();
	  } else {
	    Firebase.database().ref("users/" + uid + "/follow/" + code).set(true);
	  }
	}

    var onButtonAction = () => {
	  let result;
	  let nbField = Number.parseFloat(this.state.numberField);
	  if(bid) {
	    if(this.state.rowClassName === "buy") result = this.state.numberField * ask;
	    else if(this.state.rowClassName === "sell") result = this.state.numberField * bid;
	  } else result = this.state.numberField * mid;
	  if(this.state.rowClassName === "buy") {
	    if(currentBalance >= result) {
		  let newBalance = currentBalance - result;
		  let newAmount = currentAmount+nbField;
		  let newValue = currentValue+result;
		  Firebase.database().ref("users/" + uid + "/balance").set(newBalance);
		  Firebase.database().ref("users/" + uid + "/wallet/" + code).set({amount:newAmount,value:newValue});
		} else this.setState({valueField: "Brak funduszy"});
	  }
	  else if(this.state.rowClassName === "sell") {
	    if(nbField > currentAmount) this.setState({valueField: "Nie masz tyle"});
		// eslint-disable-next-line
		else if(nbField == currentAmount) {
		  let newBalance = currentBalance + result;
		  Firebase.database().ref("users/" + uid + "/balance").set(newBalance);
		  Firebase.database().ref("users/" + uid + "/wallet/" + code).set({amount:0,value:0});
		}  
		else {
		  let newBalance = currentBalance + result;
		  let newAmount = currentAmount-nbField;
		  let newValue = currentValue*((currentAmount-nbField)/currentAmount);
		  Firebase.database().ref("users/" + uid + "/balance").set(newBalance);
		  Firebase.database().ref("users/" + uid + "/wallet/" + code).set({amount:newAmount,value:newValue});
		}  
	  }
	}

    var transactionChange = (event) => {
	  switch(event.target.value) {
	    case "No Action":
		  this.setState({inputDisabled: true,
		                 checkboxDisabled: false,
						 rowClassName: this.state.midDiff > 0 ? "rise" : this.state.midDiff < 0 ? "drop" : "noChange",
						 selectClassName: (this.state.midDiff > 0 ? "rise" : this.state.midDiff < 0 ? "drop" : "noChange").concat(" formItem"),
						 numberFieldClassName: (this.state.midDiff > 0 ? "rise riseNumberField" : this.state.midDiff < 0 ? "drop dropNumberField" : "noChange").concat(" numberField formItem"),
						 valueFieldClassName: (this.state.midDiff > 0 ? "rise riseNumberField" : this.state.midDiff < 0 ? "drop dropNumberField" : "noChange").concat(" numberField formItem valueField")
						});
		  break;
		case "Buy":
		  this.setState({inputDisabled: false,
		                 checkboxDisabled: true,
						 rowClassName: "buy",
						 selectClassName: "buy".concat(" formItem"),
						 numberFieldClassName: "buy".concat(" numberField formItem"),
						 valueFieldClassName: "buy".concat(" numberField formItem valueField")
						});
		  break;
		case "Sell":
		  this.setState({inputDisabled: false,
		                 checkboxDisabled: true,
						 rowClassName: "sell",
						 selectClassName: "sell".concat(" formItem"),
						 numberFieldClassName: "sell".concat(" numberField formItem"),
						 valueFieldClassName: "sell".concat(" numberField formItem valueField")
						});
		  break;
		default:
		  break;
	  }
	}

    var numberFieldChange = (event) => {
	  let result;
	  this.setState({numberField: event.target.value});
	  if(bid) {
	    if(this.state.rowClassName === "buy") result = event.target.value * ask;
	    else if(this.state.rowClassName === "sell") result = event.target.value * bid;
	  } else result = event.target.value * mid;
	  if(event.target.value === "") this.setState({valueField: event.target.value});
	  else {
	    result = result.toString();
		let secondFractional = result.indexOf(".") + 2;
		let firstSignificant = result.slice(secondFractional).search(/[1-9]/);
		if(result.charAt(secondFractional-1) !== "0") result = result.slice(0, secondFractional+1);
		else result = result.slice(0, secondFractional+firstSignificant+1);
	    this.setState({valueField: result.concat(" PLN")});
	  }
	}

    return (
      <tr className={this.state.rowClassName}>
        <td><input type="checkbox" className={"formItem"} onClick={() => onCheckboxAction()} defaultChecked={follow} disabled={this.state.checkboxDisabled} /></td>
        <td>{name}</td>
        <td>{code}</td>
        <td>{mid.toString().replace(".",",")}</td>
        <td>{bid ? bid.toString().replace(".",",") : "B/D"}</td>
        <td>{ask ? ask.toString().replace(".",",") : "B/D"}</td>
        <td>{this.state.midDiff.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 6})}({((mid / oldMid - 1) * 100).toFixed(2).replace(".",",")}%)</td>
        <td>
		  <select onChange={(event) => transactionChange(event)} className={this.state.selectClassName}>
		    <option value="No Action">Brak</option>
            <option value="Buy">Kup</option>
            <option value="Sell">Sprzedaj</option>
          </select>
		</td>
        <td><input type="number" min="1" max="99999999" onChange={(event) => numberFieldChange(event)} disabled={this.state.inputDisabled} className={this.state.numberFieldClassName} /></td>
        <td><input type="text" disabled={true} className={this.state.valueFieldClassName} value={this.state.valueField} /></td>
        <td><input type="button" value="Wykonaj" className={this.state.rowClassName} disabled={this.state.inputDisabled} onClick={() => onButtonAction()} /></td>
      </tr>
    );
  }
}

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Rates);
