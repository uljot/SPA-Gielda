import React from 'react';

import withAuthorization from './withAuthorization';
import NBPFetch from './NBPFetch';
import { Load } from './Load';

class Update extends Load {
  render() {
    const { dates } = this.state;
    var toUpdate = [];
    
    if(dates) {
      var lastUpdate = dates.slice(-1);
      var currentDate = new Date();
	  if(currentDate.getHours() < 11) currentDate.setDate(currentDate.getDate() - 1);
	  currentDate = currentDate.toISOString().slice(0, 10);
      // eslint-disable-next-line
      while(lastUpdate != currentDate) {
        lastUpdate = new Date(lastUpdate);
        lastUpdate.setDate(lastUpdate.getDate() + 1);
        var dayOfTheWeek = lastUpdate.getDay();
        lastUpdate = lastUpdate.toISOString().slice(0, 10);
		// eslint-disable-next-line
        if((dayOfTheWeek != 0) && (dayOfTheWeek != 6)) toUpdate.push(lastUpdate);
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
