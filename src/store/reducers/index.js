import { combineReducers } from 'redux';
import { authorizationReducer as authorization } from './authorization';
import { cardsReducer as cards } from './cards';
import { applicationReducer as application } from './application';

const rootReducer = combineReducers({
  application,
  authorization,
  cards
});

export default rootReducer;