import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PwForget';
import AuthUserContext from './AuthUserContext';
import { auth } from '../firebase';
import { providerGoogle } from '../firebase/firebase';
import * as routes from '../constants/routes';

const RootPage = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <Redirect to={routes.DASHBOARD} />
      : <SignInPage />
    }
  </AuthUserContext.Consumer>

const SignInPage = ({ history }) =>
  <div>
    <h1>Zaloguj się</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
    <SignInGoogle />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Hasło"
        />
        <button disabled={isInvalid} type="submit">
          Zaloguj się
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

class SignInGoogle extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleClick = (event) => {
    const {
      history,
    } = this.props;

    auth.doSignInWithGoogle()
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>
          Login with Google
        </button>
      </div>
    );
  }
}

export default withRouter(RootPage);

export {
  SignInForm,
};
