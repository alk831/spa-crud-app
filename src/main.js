import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppWithHMR } from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import axios from 'axios';
import { HOST } from './common/consts';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const store = configureStore();

axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = true;

dayjs.locale('pl');

ReactDOM.render((
  <Provider store={store}>
    <AppWithHMR />
  </Provider>
), document.getElementById('app'));