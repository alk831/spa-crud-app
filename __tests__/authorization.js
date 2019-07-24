import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import axiosMock from 'axios';
import { Login } from '../src/pages/Login';
import { configureStore } from '../src/store/store';
import { BrowserRouter as Router } from 'react-router-dom';

let store;

const LoginWithStore = (
  <Provider store={store}>
    <Router>
      <Login />
    </Router>
  </Provider>
);

beforeEach(() => {
  store = configureStore();
});

test('', () => {
});