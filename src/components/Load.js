import { Component } from 'react';
import Firebase from 'firebase';

import withAuthorization from './withAuthorization';

export class Load extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
	  currentRates: null,
	  lastRates: null,
	  dates: null,
	  midsByCurrency: null
    };
  }

  componentDidMount() {
    let last = 30;
	
    Firebase.database().ref("/").orderByKey().on('value', (snapshot) => {
      let user = snapshot.val().users[Firebase.auth().currentUser.uid]
	  let dates = Object.keys(snapshot.val().rates).slice(-last)
	  let currentRates = snapshot.val().rates[dates.slice(-1)]
	  let lastRates = snapshot.val().rates[dates.slice(-2, -1)]
	  let midsByCurrency = Object.keys(currentRates).map((currency) => {
	    return dates.map((date) => {
		  return snapshot.val().rates[date][currency].mid
		})
	  })
	  this.setState(() => ({
        user: user,
        currentRates: currentRates,
        lastRates: lastRates,
        dates: dates,
        midsByCurrency: midsByCurrency
	  }))
    });
  }

  render() {
    return null;
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Load);
