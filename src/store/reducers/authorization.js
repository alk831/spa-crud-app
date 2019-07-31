import {
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT,
} from '../consts';
import { getAuthData } from '../../common/utils';

const authData = getAuthData();

export const initialState = {
  isLoggedIn: false,
  user: null,
  group: null,
  groups: [],
}

const mergedState = {
  ...initialState,
  ...authData,
  isLoggedIn: (authData && authData.user) != null
}

export function authorizationReducer(
  state = mergedState,
  action
) {
  switch(action.type) {
    case AUTH_LOGGED_IN: return {
      ...state,
      user: action.payload.user,
      group: action.payload.user.group,
      groups: action.payload.groups,
      isLoggedIn: true,
      isLoading: false
    }
    case AUTH_LOGGED_OUT: return initialState;
    default: return state;
  }
}