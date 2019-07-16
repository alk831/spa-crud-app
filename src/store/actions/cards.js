import {
  CARD_LIKED,
  CARD_DISLIKED,
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED
} from '../consts';
import { HOST } from '../../common/consts';

export const cardLiked = (payload) => ({
  type: CARD_LIKED,
  payload
});

export const cardDisliked = (id) => ({
  type: CARD_DISLIKED,
  meta: { id }
});

export const cardsFetchRequested = () => ({
  type: CARDS_FETCH_REQUESTED
});

export const cardsFetchSucceeded = (payload) => ({
  type: CARDS_FETCH_SUCCEEDED,
  payload
});

export const cardsFetchFailed = (error) => ({
  type: CARDS_FETCH_FAILED,
  error
});

export const fetchLikedCards = () => async (dispatch) => {
  dispatch(cardsFetchRequested());

  const response = await fetch(`${HOST}/cards/favorite`);
  const data = await response.json();
  console.log({ data })
  
  dispatch(cardsFetchSucceeded(data));
}