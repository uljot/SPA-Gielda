import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Kokpit</h1>
        <p>Panel kokpitu tu zaistnieje</p>
        { !!users && <UserList users={users} /> }
        <AuthUserContext.Consumer>
          {authUser =>
            <div>
              <h1>Account: {authUser.email}</h1>
            </div>
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>Lista nazw użytkowników</h2>
    <p>(Zapisana w firebase przy tworzeniu kont)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
