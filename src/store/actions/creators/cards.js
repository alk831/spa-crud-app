import {
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED,
  CARDS_LIKED_REMOVED,
  CARDS_POPULAR_SKIPPED,
  CARDS_POPULAR_LIKED,
  CARDS_FETCH_MORE_SUCCEEDED
} from '../../consts';


export const cardsLikedRemoved = (cardId) => ({
  type: CARDS_LIKED_REMOVED,
  meta: { id: cardId }
});

export const cardsFetchRequested = () => ({
  type: CARDS_FETCH_REQUESTED
});

export const cardsFetchFailed = (error) => ({
  type: CARDS_FETCH_FAILED,
  error
});

export const cardsFetchSucceeded = (payload, target) => ({
  type: CARDS_FETCH_SUCCEEDED,
  payload,
  meta: { target }
});

export const cardsFetchMoreSucceeded = (payload, target) => ({
  type: CARDS_FETCH_MORE_SUCCEEDED,
  payload,
  meta: { target }
});

export const cardsPopularSkipped = (cardId) => ({
  type: CARDS_POPULAR_SKIPPED,
  meta: { id: cardId }
});

export const cardsPopularLiked = (cardId) => ({
  type: CARDS_POPULAR_LIKED,
  meta: { id: cardId }
});