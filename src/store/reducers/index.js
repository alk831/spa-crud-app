import { combineReducers } from 'redux';
import { authorizationReducer as authorization } from './authorization';

const rootReducer = combineReducers({
  authorization
});

export default rootReducer;