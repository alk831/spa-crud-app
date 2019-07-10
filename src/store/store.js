import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { authorizationReducer as authorization } from './reducers/authorization';

const reducers = combineReducers({
  authorization
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);