import React from 'react';
import usersMock from '../../__mocks__/usersMock';
import { render, fireEvent } from '@testing-library/react';
import { App } from '../helpers';
import { configureStore } from '../../src/store/store';
import { initialState } from '../../src/store/reducers/authorization';
import permissionGroups from '../../__mocks__/permissionGroups';
import { Users } from '../../src/pages/Users';
import axios from 'axios';
import * as Utils from '../../src/common/utils';

jest.mock('axios');
jest.mock('../../src/common/utils');

test('it should allow to edit user\'s points if has permissions', async () => {
  const [firstUserData] = usersMock;
  const mockedPoints = 400;

  axios.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: usersMock }})
  );
  axios.patch.mockImplementationOnce(() =>
    Promise.resolve({ data: {}})
  );

  Utils.debounce.mockImplementationOnce((fn) => fn());

  const store = configureStore({
    authorization: {
      ...initialState,
      group: 'admin',
      groups: permissionGroups
    }
  });
  
  const { findAllByTestId } = render(
    <App store={store}>
      <Users />
    </App>
  );

  const [firstPointsInput] = await findAllByTestId('BasicInput');

  fireEvent.change(firstPointsInput, { target: { value: mockedPoints }});

  expect(axios).toHaveBeenCalledTimes(1);
  expect(axios).toHaveBeenCalledWith('/users');  
  expect(axios.patch).toHaveBeenCalledTimes(1);
  expect(axios.patch).toHaveBeenCalledWith(`/users/${firstUserData.id}`, { points: mockedPoints });
});