import React from 'react';
import * as axiosMock from 'axios';
import { Home } from '../src/pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '../src/store/store';
import { render, waitForElement, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('axios');

const cardsMock = [
  {
    category: "mobile interaction",
    color: "#bec1d1",
    createdAt: "2019-07-23T12:43:21.000Z",
    creatorId: "35254946991442853",
    creatorName: "Muzli",
    creatorUrl: "https://www.pinterest.com/usemuzli/",
    id: "35254809569571125",
    imageHeight: 600,
    imageUrl: "https://i.pinimg.com/originals/59/f0/a1/59f0a1970a5e01d13bd04fa8e8f2c868.gif",
    imageWidth: 800,
    note: "Save interaction",
    updatedAt: "2019-07-23T12:43:21.000Z",
    url: "https://www.pinterest.com/pin/35254809569571125/"
  },
  {
    category: "mobile interaction",
    color: "#bec1d1",
    createdAt: "2019-07-23T12:43:21.000Z",
    creatorId: "35254946991442853",
    creatorName: "Muzli",
    creatorUrl: "https://www.pinterest.com/usemuzli/",
    id: "35254809569571126",
    imageHeight: 600,
    imageUrl: "https://i.pinimg.com/originals/59/f0/a1/59f0a1970a5e01d13bd04fa8e8f2c868.gif",
    imageWidth: 800,
    note: "Save interaction",
    updatedAt: "2019-07-23T12:43:21.000Z",
    url: "https://www.pinterest.com/pin/35254809569571125/"
  }
]

let store;

beforeEach(() => store = configureStore());

test('liking cards works properly', async () => {
  const [firstCardData, secondCardData] = cardsMock;

  axiosMock.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock }})
  );

  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { data: cardsMock[0] }})
  );

  const { getAllByTestId, getAllByTitle, container } = render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );

  const [
    firstCard,
    secondCard
  ] = await waitForElement(() => getAllByTestId('Home__cards-item'));

  /* It catches these buttons from slider */
  const [firstCardLikeBtn] = getAllByTitle('Polub'); 
  const [, secondCardSkipBtn] = getAllByTitle('Pomiń');

  fireEvent.mouseOver(firstCard);
  fireEvent.click(firstCardLikeBtn);

  expect(container).toMatchSnapshot();

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith('/cards/popular');
  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(axiosMock.post).toHaveBeenCalledWith('/cards', firstCardData);
});