import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAWlID7Mv5cts5WoZNOzLz6Mxrx6jT3zSM',
  authDomain: 'call-system-c9c6c.firebaseapp.com',
  projectId: 'call-system-c9c6c',
  storageBucket: 'call-system-c9c6c.appspot.com',
  messagingSenderId: '1024362042014',
  appId: '1:1024362042014:web:6876a0d3981cdd6dad218f',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const Auth = firebase.auth();
const User = db.collection('Users');
const Customers = db.collection('Customers');
const Called = db.collection('Called');

export { Auth, User, Customers, Called };
