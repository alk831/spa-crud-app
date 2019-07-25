import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '../src/store/store';
import { Provider } from 'react-redux';

let defaultStore;

beforeEach(() => defaultStore = configureStore());

export const App = ({
  store = defaultStore,
  children
}) => (
  <Provider store={store}>
    <Router>
      {children}
    </Router>
  </Provider>
);