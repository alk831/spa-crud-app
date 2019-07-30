import {
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT,
} from '../../consts';

export const authLoggedIn = (authData) => ({
  type: AUTH_LOGGED_IN,
  payload: authData
});

export const authLoggedOut = () => ({
  type: AUTH_LOGGED_OUT
});