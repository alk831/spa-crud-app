import 'react-hot-loader';
import './assets/css/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import axios from 'axios';
import { HOST } from './common/consts';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const store = configureStore();
const twentySeconds = 1000 * 20;

axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = true;
axios.defaults.timeout = twentySeconds;

dayjs.locale('pl');

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));