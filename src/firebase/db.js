import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, balance, wallet) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    balance,
    wallet,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
