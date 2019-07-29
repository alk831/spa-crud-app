import {
  CARD_LIKED,
  CARD_DISLIKED,
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED,
  CARDS_LIKED_REMOVED,
  CARDS_POPULAR_SKIPPED,
  CARDS_POPULAR_LIKED
} from '../../consts';

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

// export const cardsFetchSucceeded = (payload) => ({
//   type: CARDS_FETCH_SUCCEEDED,
//   payload
// });

export const cardsFetchFailed = (error) => ({
  type: CARDS_FETCH_FAILED,
  error
});

export const cardsFetchSucceeded = (payload, target) => ({
  type: CARDS_FETCH_SUCCEEDED,
  payload,
  meta: { target }
});

export const cardsMoreFetchSucceeded = (payload, target) => ({
  type: CARDS_MORE_FETCH_SUCCEEDED,
  payload,
  meta: { target }
});

// export const cardsLikedRemoved = (cardId) => ({
//   type: CARDS_LIKED_REMOVED,
//   meta: { id: cardId }
// });

export const cardsPopularSkipped = (cardId) => ({
  type: CARDS_POPULAR_SKIPPED,
  meta: { id: cardId }
});

export const cardsPopularLiked = (cardId) => ({
  type: CARDS_POPULAR_LIKED,
  meta: { id: cardId }
});