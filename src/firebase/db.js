import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, balance, wallet, follow) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    balance,
    wallet,
    follow,
  });
