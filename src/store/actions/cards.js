import { CARD_LIKED, CARD_DISLIKED } from "../consts";

export const cardLiked = (payload) => ({
  type: CARD_LIKED,
  payload
});

export const cardDisliked = (id) => ({
  type: CARD_DISLIKED,
  meta: { id }
});