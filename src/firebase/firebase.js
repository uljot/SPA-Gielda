import * as firebase from 'firebase';
import { details } from '../constants/ProjectDetails';

const config = details;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
