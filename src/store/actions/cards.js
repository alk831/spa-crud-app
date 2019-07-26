import {
  CARD_LIKED,
  CARD_DISLIKED,
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED,
  CARDS_LIKED_REMOVED,
  CARDS_POPULAR_SKIPPED,
  CARDS_POPULAR_LIKED
} from '../consts';
import axios from 'axios';
import { appFetchRequested, appRequestFailed, appFetchFailed } from './application';

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
  try {
    dispatch(appFetchRequested());
    const { data: { data }} = await axios('/cards/favorite');
    dispatch(cardsFetchSucceeded(data));
  } catch(error) {
    dispatch(appFetchFailed(error));
  }
}

export const fetchPopularCards = () => async (dispatch) => {
  try {
    dispatch(appFetchRequested());
    const 
  } catch(error) {

  }
}

export const cardsLikedRemoved = (cardId) => ({
  type: CARDS_LIKED_REMOVED,
  meta: { id: cardId }
});

export const cardsLikedRemove = (cardId) => async (dispatch) => {
  try {
    await axios.delete(`/cards/favorite/${cardId}`);
    dispatch(cardsLikedRemoved(cardId));
  } catch(error) {
    dispatch(appRequestFailed(error));
  }
}

export const cardsPopularSkipped = (cardId) => ({
  type: CARDS_POPULAR_SKIPPED,
  meta: { id: cardId }
});

export const cardsPopularLiked = (cardId) => ({
  type: CARDS_POPULAR_LIKED,
  meta: { id: cardId }
});

export const cardsPopularLike = (card) => async (dispatch) => {
  try {
    dispatch(cardsPopularLiked(card.id));
    await axios.post('/cards/favorite', card);
  } catch(error) {
    dispatch(appRequestFailed(error));
  }
}

export const cardsLikedRemoved = (cardId) => ({
  type: CARDS_LIKED_REMOVED,
  meta: { id: cardId }
});

export const cardsLikedRemove = (cardId) => async (dispatch) => {
  try {
    dispatch(cardsLikedRemoved(cardId));
    await axios.delete(`/cards/favorite/${cardId}`);
  } catch(error) {
    dispatch(appFetchFailed(error));
  }
}