import {
  CARDS_FETCH_SUCCEEDED,
  CARDS_LIKED_REMOVED,
  CARDS_POPULAR_SKIPPED,
  CARDS_POPULAR_LIKED,
} from '../../consts';

export const cardsLikedRemoved = (cardId) => ({
  type: CARDS_LIKED_REMOVED,
  meta: { id: cardId }
});

export const cardsFetchSucceeded = (payload, target, pagination) => ({
  type: CARDS_FETCH_SUCCEEDED,
  payload,
  meta: { target, pagination }
});

export const cardsPopularSkipped = (cardId) => ({
  type: CARDS_POPULAR_SKIPPED,
  meta: { id: cardId }
});

export const cardsPopularLiked = (cardId) => ({
  type: CARDS_POPULAR_LIKED,
  meta: { id: cardId }
});