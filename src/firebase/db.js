import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, balance) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    balance,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
