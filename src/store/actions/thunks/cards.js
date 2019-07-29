import {
  cardLiked,
  cardsFetchSucceeded,
  cardDisliked,
  cardsMoreFetchSucceeded,
  cardsPopularLiked,
  appFetchRequested,
  appRequestFailed,
  appFetchFailed,
} from '../creators';
import axios from 'axios';

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
    const { data: { data }} = await axios('/cards/popular');
  } catch(error) {
  }
}

export const cardsFetchRequest = (target) => async (dispatch) => {
  try {
    const parsedTarget = target === 'liked' ? 'favorite' : 'popular';
    const { data: { data }} = await axios(`/cards/${parsedTarget}`);
    dispatch(cardsFetchSucceeded(data, target));
  } catch(error) {
    dispatch(appRequestFailed(error));
  }
}

export const cardsFetchMoreRequest = (target) => async (dispatch, getState) => {
  const parsedTarget = target === 'liked' ? 'favorite' : 'popular';
  const { page } = getState().cards;
  const nextPage = page + 1;

  const { data: { data }} = await axios(`/cards/${parsedTarget}?page=${nextPage}`);
  dispatch(cardsMoreFetchSucceeded(data, target));
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
    dispatch(appRequestFailed(error));
  }
}