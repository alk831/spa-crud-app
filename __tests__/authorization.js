import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as axiosMock from 'axios';
import { Login } from '../src/pages/Login';
import { Register } from '../src/pages/Register';
import { configureStore } from '../src/store/store';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const App = ({ store, children }) => (
  <Provider store={store}>
    <Router>
      {children}
    </Router>
  </Provider>
);

let store;

beforeEach(() => {
  store = configureStore();
});

test('display error when email is too short', () => {
  const invalidEmail = 'test@.com';

  const { getByPlaceholderText, getByText, getByTestId } = render(
    <App store={store}>
      <Login />
    </App>
  );

  const emailInput = getByPlaceholderText('Adres email');
  const submitButton = getByText('Zaloguj się');

  fireEvent.input(emailInput, { target: { value: invalidEmail }});
  fireEvent.submit(submitButton);

  const formError = getByTestId('Form__error');

  expect(formError).toBeInTheDocument();
});

test('display error when password is too short', () => {
  const validEmail = 'test@abc.com';
  const invalidPassword = 'a';

  const { getByPlaceholderText, getByText, getByTestId } = render(
    <App store={store}>
      <Register />
    </App>
  );

  const emailInput = getByPlaceholderText('Adres email');
  const passwordInput = getByPlaceholderText('Hasło');
  const submitButton = getByText('Zaloguj się');

  fireEvent.input(emailInput, { target: { value: validEmail }});
  fireEvent.input(passwordInput, { target: { value: invalidPassword }});
  fireEvent.submit(submitButton);

  const formError = getByTestId('Form__error');

  expect(formError).toBeInTheDocument();
});

test('display error when server responds with unauthorized', async () => {
  const validEmail = 'test@abc.com';
  const validPassword = 'Abc127zwe';
  const responseMock = {
    data: {},
    request: {},
    config: {},
    response: {
      statusText: '',
      status: 401
    }
  }

  axiosMock.post.mockImplementationOnce(() => 
    Promise.reject(responseMock)
  );

  const { getByPlaceholderText, getByText, getByTestId } = render(
    <App store={store}>
      <Register />
    </App>
  );

  const emailInput = getByPlaceholderText('Adres email');
  const passwordInput = getByPlaceholderText('Hasło');
  const submitButton = getByText('Zaloguj się');

  fireEvent.input(emailInput, { target: { value: validEmail }});
  fireEvent.input(passwordInput, { target: { value: validPassword }});
  fireEvent.submit(submitButton);

  const formError = await waitForElement(() => getByTestId('Form__error'));

  expect(formError).toBeInTheDocument();
  expect(axiosMock.post).toHaveBeenCalledTimes(1);
});