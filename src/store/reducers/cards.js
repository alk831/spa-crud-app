import {
  CARD_LIKED,
  CARD_DISLIKED,
  CARDS_FETCH_REQUESTED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_FETCH_FAILED
} from "../consts";

const initialState = {
  isLoading: true,
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
    case CARDS_FETCH_REQUESTED: return {
      ...state,
      isLoading: true
    }
    case CARDS_FETCH_SUCCEEDED: return {
      ...state,
      isLoading: false,
      liked: action.payload
    }
    case CARDS_FETCH_FAILED: return {
      ...state,
      isLoading: false
    }
    default: return state;
  }
}