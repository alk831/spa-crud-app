import { combineReducers } from 'redux';
import { authorizationReducer as authorization } from './authorization';
import { cardsReducer as cards } from './cards';

const rootReducer = combineReducers({
  authorization,
  cards
});

export default rootReducer;