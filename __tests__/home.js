import React from 'react';
import * as axiosMock from 'axios';
import { Home } from '../src/pages/Home';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import cardsMock from '../__mocks__/cardsMock';
import { App } from './helpers';

jest.mock('axios');

test('liking cards works properly', async () => {
  const [firstCardData] = cardsMock;

  axiosMock.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock }})
  );
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock[0] }})
  );

  const { getAllByTestId, getAllByTitle } = render(
    <App>
      <Home />
    </App>
  );

  const [firstCard] = await waitForElement(() => getAllByTestId('Home__cards-item'));

  const [firstCardLikeBtn] = getAllByTitle('Polub'); 

  fireEvent.mouseOver(firstCard);
  fireEvent.click(firstCardLikeBtn);

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith('/cards/popular');
  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(axiosMock.post).toHaveBeenCalledWith('/cards/favorite', firstCardData);
});

test('skipping cards works properly', async () => {
  axiosMock.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock }})
  );
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock[0] }})
  );

  const { getAllByTestId, getAllByTitle } = render(
    <App>
      <Home />
    </App>
  );

  const [firstCard] = await waitForElement(() => getAllByTestId('Home__cards-item'));
  const [firstCardSkipBtn] = getAllByTitle('Pomiń');

  fireEvent.mouseOver(firstCard);
  fireEvent.click(firstCardSkipBtn);

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock.post).not.toHaveBeenCalled();
});