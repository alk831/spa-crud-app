import { LOGOUT, LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../consts';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  error: null,
  token: null,
  tokenExp: null,
  role: 'guest'
}

export function authorizationReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case LOGIN_REQUESTED: return {
      ...state,
      isLoggingIn: true
    }
    case LOGIN_SUCCEEDED: return {
      ...state,
      ...action.payload,
      isLoggedIn: true,
      isLoggingIn: false,
    }
    case LOGIN_FAILED: return {
      ...state,
      isLoggingIn: false,
      error: action.error.message
    }
    case LOGOUT: return initialState;
    default: return state;
  }
}