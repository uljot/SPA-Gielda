import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyApFjATr-O0bA3hv-gZkYw78ko8qyoeew0",
  authDomain: "spa-gielda.firebaseapp.com",
  databaseURL: "https://spa-gielda.firebaseio.com",
  projectId: "spa-gielda",
  storageBucket: "spa-gielda.appspot.com",
  messagingSenderId: "992853169048"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

export {
  db,
  auth,
  providerGoogle,
};
