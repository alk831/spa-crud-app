import {
  cardsFetchSucceeded,
  cardsPopularLiked,
  appRequestFailed,
  cardsFetchRequested,
  cardsLikedRemoved,
  cardsFetchMoreSucceeded,
} from '../creators';
import axios from 'axios';
import { parseCardsTarget } from '../../../common/utils';

export const cardsFetchRequest = (target) => async (dispatch) => {
  try {
    dispatch(cardsFetchRequested());
    const parsedTarget = parseCardsTarget(target);

    const { data: { data }} = await axios(`/cards/${parsedTarget}`);
    dispatch(cardsFetchSucceeded(data, target));

  } catch(error) {
    dispatch(appRequestFailed(error));
  }
}

export const cardsFetchRequestMore = (target) => async (dispatch, getState) => {
  const parsedTarget = parseCardsTarget(target);
  const { page } = getState().cards;
  const nextPage = page + 1;

  const { data: { data }} = await axios(`/cards/${parsedTarget}?page=${nextPage}`);
  dispatch(cardsFetchMoreSucceeded(data, target));
}

export const cardsLikedRemove = (cardId) => async (dispatch) => {
  try {
    await axios.delete(`/cards/favorite/${cardId}`);
    dispatch(cardsLikedRemoved(cardId));
  } catch(error) {
    dispatch(appRequestFailed(error));
  }
}

export const cardsPopularLike = (card) => async (dispatch) => {
  try {
    dispatch(cardsPopularLiked(card.id));
    await axios.post('/cards/favorite', card);
  } catch(error) {
    console.error(error)
    dispatch(appRequestFailed(error));
  }
}