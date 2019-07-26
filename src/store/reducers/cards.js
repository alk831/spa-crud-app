import {
  CARDS_FETCH_REQUESTED,
  CARDS_POPULAR_LIKED,
} from '../consts';

const initialState = {
  isLoading: true,
  page: 1,
  popular: [],
  liked: []
}

export function cardsReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case CARDS_FETCH_REQUESTED: return {
      ...state,
      isLoading: true,
      page: action.meta.page
    }
    case CARDS_POPULAR_SKIPPED:
      const [skippedCard, ...popular] = state.popular;
      return { ...state, popular };
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