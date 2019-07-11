import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppWithHMR } from './App';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

const store = configureStore();

firebase.initializeApp(firebaseConfig);

ReactDOM.render((
  <Provider store={store}>
    <AppWithHMR />
  </Provider>
), document.getElementById('app'));