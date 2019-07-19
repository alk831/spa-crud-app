import { LOGOUT, LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED, REGISTER_REQUESTED, REGISTER_SUCCEEDED, REGISTER_FAILED } from '../consts';
import { isDevelopment } from '../../common/consts';

const initialState = {
  isLoggedIn: isDevelopment,
  isLoading: false,
  user: {},
  error: null,
  group: null,
  groups: []
}

export function authorizationReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case LOGIN_REQUESTED: return {
      ...state,
      isLoading: true
    }
    case LOGIN_SUCCEEDED: return {
      ...state,
      user: action.payload.data,
      group: action.payload.data.group,
      groups: action.payload.groups,
      isLoggedIn: true,
      isLoading: false
    }
    case LOGIN_FAILED: return {
      ...state,
      isLoading: false,
      error: action.error.message
    }
    case REGISTER_REQUESTED: return {
      ...state,
      isLoading: true
    }
    case REGISTER_SUCCEEDED: return {
      ...state,
      user: action.payload,
      isLoading: false,
      isLoggedIn: true
    }
    case REGISTER_FAILED: return {
      ...state,
      isLoading: false,
      error: action.error.message
    }
    case LOGOUT: return initialState;
    default: return state;
  }
}