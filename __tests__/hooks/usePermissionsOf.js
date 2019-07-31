import React from 'react';
import { usePermissionsOf } from '../../src/common/hooks'; 
import { configureStore } from '../../src/store/store';
import { initialState } from '../../src/store/reducers/authorization';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import groupsMock from '../../__mocks__/permissionGroups';

const secretMessage = 'Secret content';
const unauthorizedMessage = 'You have no permissions to see secret content';

function Component({ group = 'moderator', inheritance }) {
  const isAllowed = usePermissionsOf(group, inheritance);

  return (
    <span data-testid="secret_message">
      {isAllowed ? secretMessage : unauthorizedMessage}
    </span>
  );
}

test('does not allow when user has insufficient permissions', () => {
  const store = configureStore();

  const { container } = render(
    <Provider store={store}>
      <Component group="moderator" />
    </Provider>
  );
  
  expect(container.firstChild).not.toHaveTextContent(secretMessage);
});

test('allows if user has equal or greater permissions', () => {
  const store = configureStore({
    authorization: {
      ...initialState,
      group: 'moderator',
      groups: groupsMock
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Component group="moderator" />
    </Provider>
  );
  
  expect(container.firstChild).toHaveTextContent(secretMessage);
});

test('does not allow when group is not equal to required - inheritance disabled', () => {
  const store = configureStore({
    authorization: {
      ...initialState,
      group: 'admin',
      groups: groupsMock
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Component group="moderator" inheritance={false} />
    </Provider>
  );
  
  expect(container.firstChild).not.toHaveTextContent(secretMessage);
});