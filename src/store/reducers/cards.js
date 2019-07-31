import {
  CARDS_POPULAR_LIKED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_POPULAR_SKIPPED,
  CARDS_LIKED_REMOVED,
} from '../consts';

const initialState = {
  popular: [],
  liked: []
}

export function cardsReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case CARDS_FETCH_SUCCEEDED: return {
      ...state,
      [action.meta.target]: action.payload,
    }
    case CARDS_POPULAR_SKIPPED:
      const [skippedCard, ...popular] = state.popular;
      return { ...state, popular }
    case CARDS_POPULAR_LIKED:
      const likedCardIndex = state.popular.findIndex(card =>
        card.id === action.meta.id
      );
      const popularCards = [...state.popular];
      const likedCard = popularCards.splice(likedCardIndex, 1);
      const likedCards = [...state.liked, likedCard];
      return {
        ...state,
        popular: popularCards,
        liked: likedCards
      }
    case CARDS_LIKED_REMOVED: return {
      ...state,
      liked: state.liked.filter(card => card.id !== action.meta.id)
    }
    default: return state;
  }
}