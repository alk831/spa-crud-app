import { CARD_LIKED, CARD_DISLIKED } from "../consts";

const initialState = {
  liked: []
}

export function cardsReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case CARD_LIKED: return {
      ...state,
      liked: [...state.liked, action.payload]
    }
    case CARD_DISLIKED: return {
      ...state,
      liked: state.liked.filter(card => 
        card.id !== action.meta.id
      )
    }
    default: return state;
  }
}