import {
  CARD_LIKED,
  CARD_DISLIKED,
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED
} from '../consts';
import axios from 'axios';

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

export const saveLikedCard = (card) => async (dispatch) => {
  const { data: { data }} = await axios.post('/cards/favorite', card);
  dispatch(cardLiked(data));
}

export const removeLikedCard = (cardId) => async (dispatch) => {
  dispatch(cardDisliked(cardId));

  await axios.delete(`/cards/favorite/${cardId}`);
}

export const fetchLikedCards = () => async (dispatch) => {
  dispatch(cardsFetchRequested());

  const { data: { data }} = await axios('/cards/favorite');
  
  dispatch(cardsFetchSucceeded(data));
}