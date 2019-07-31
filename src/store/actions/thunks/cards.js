import {
  cardsFetchSucceeded,
  cardsPopularLiked,
  cardsLikedRemoved,
  appErrorOccured,
} from '../creators';
import axios from 'axios';
import { parseCardsTarget } from '../../../common/utils';

export const cardsFetchRequest = (target, page = 1) => async (dispatch) => {
  try {
    const parsedTarget = parseCardsTarget(target);

    const { data: { data, ...pagination }} = await axios(
      `/cards/${parsedTarget}?page=${page}`
    );

    dispatch(cardsFetchSucceeded(data, target, pagination));
    const isLastPage = pagination.count === 0;
    
    return isLastPage;
  } catch(error) {
    dispatch(appErrorOccured(error));
  }
}

export const cardsLikedRemove = (cardId) => async (dispatch) => {
  try {
    await axios.delete(`/cards/favorite/${cardId}`);
    dispatch(cardsLikedRemoved(cardId));
  } catch(error) {
    dispatch(appErrorOccured(error));
  }
}

export const cardsPopularLike = (card) => async (dispatch) => {
  try {
    dispatch(cardsPopularLiked(card.id));
    await axios.post('/cards/favorite', card);
  } catch(error) {
    dispatch(appErrorOccured(error));
  }
}