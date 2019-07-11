import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppWithHMR } from './App';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<AppWithHMR />, document.getElementById('app'));