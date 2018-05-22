import React, { Component } from 'react';
import Firebase from 'firebase';

import withAuthorization from './withAuthorization';
import NBPFetch from './NBPFetch';

class Update extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    Firebase.database().ref("rates").orderByKey().limitToLast(1).on('value', (snapshot) =>
      this.setState(() => ({ data: snapshot.val() }))
    );
  }

  render() {
    const { data } = this.state;
    var toUpdate = [];
    
    if(data) {
      var lastUpdate = Object.keys(data);
      var currentDate = new Date().toISOString().slice(0, 10);
      // eslint-disable-next-line
      while(lastUpdate != currentDate) {
        lastUpdate = new Date(lastUpdate);
        lastUpdate.setDate(lastUpdate.getDate() + 1);
        var dayOfTheWeek = lastUpdate.getDay();
        lastUpdate = lastUpdate.toISOString().slice(0, 10);
        if((dayOfTheWeek !== 0) && (dayOfTheWeek !== 6)) toUpdate.push(lastUpdate);
      }
    }
    return (
      <div>
        {Object.keys(toUpdate).map(key =>
          <NBPFetch key={key} date={toUpdate[key]} />
        )}
        {lastUpdate = ""}
        {toUpdate = []}
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Update);
