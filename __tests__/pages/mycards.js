import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as axiosMock from 'axios';
import cardsMock from '../../__mocks__/cardsMock';
import { App } from '../helpers';
import { MyCards } from '../../src/pages/MyCards';

jest.mock('axios');

test('disliking cards works properly', async () => {
  const [firstCardData] = cardsMock;

  axiosMock.mockImplementationOnce(() => 
    Promise.resolve({ data: { data: cardsMock }})
  );

  axiosMock.delete.mockImplementationOnce(() =>
    Promise.reject({ data: {}})
  );

  const { findAllByTestId, findAllByTitle } = render(
    <App>
      <MyCards />
    </App>
  );

  const [firstCard] = await findAllByTestId('Card');
  const [firstCardDislikeBtn] = await findAllByTitle('Pomiń');

  fireEvent.mouseOver(firstCard);
  fireEvent.click(firstCardDislikeBtn);

  expect(axiosMock).toHaveBeenCalledWith('/cards/favorite?page=1');
  expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  expect(axiosMock.delete).toHaveBeenCalledWith(`/cards/favorite/${firstCardData.id}`);
});