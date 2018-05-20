import React, { Component } from 'react';
import Firebase from 'firebase';

import withAuthorization from './withAuthorization';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      rates: null
    };
  }

  componentDidMount() {
    Firebase.database().ref("users/" + Firebase.auth().currentUser.uid).on('value', (snapshot) =>
      this.setState(() => ({ user: snapshot.val() })))
    Firebase.database().ref("rates").orderByKey().limitToLast(1).on('value', (snapshot) =>
      this.setState((prevState, props) => {
        return {
          user: prevState.user,
          rates: snapshot.val()[Object.keys(snapshot.val())]
        };
      })
    );
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
