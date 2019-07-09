import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('app'));