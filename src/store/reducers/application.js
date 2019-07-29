import {
  LOGIN_FAILED,
  REGISTER_FAILED,
  CARDS_FETCH_FAILED,
  ERROR_TIMED_OUT,
  APP_FETCH_FAILED,
  APP_FETCH_REQUESTED,
  APP_REQUEST_FAILED,
  CARDS_FETCH_SUCCEEDED,
} from '../consts';

const initialState = {
  errors: [],
  error: null,
  isLoading: false
}

export function applicationReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case APP_FETCH_REQUESTED: return {
      ...state,
      error: null,
      isLoading: true
    }
    case APP_FETCH_FAILED: return {
      ...state,
      error: action.error,
      isLoading: false
    }
    case APP_REQUEST_FAILED: return {
      ...state,
      error: action.error
    }
    case CARDS_FETCH_SUCCEEDED: return {
      ...state,
      isLoading: false
    }
    case CARDS_FETCH_FAILED:
    case REGISTER_FAILED:
    case LOGIN_FAILED: return {
      ...state,
      errors: [...state.errors, action.error]
    }
    case ERROR_TIMED_OUT: return {
      ...state,
      errors: state.errors.slice(1)
    }
    default: return state;
  }
}