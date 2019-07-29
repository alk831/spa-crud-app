import {
  LOGOUT,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED
} from '../../consts';

/**
 * @deprecated
 */
export const loginRequested = () => ({
  type: LOGIN_REQUESTED
});

export const loginSucceeded = (payload) => ({
  type: LOGIN_SUCCEEDED,
  payload
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error
});

export const logout = () => ({
  type: LOGOUT 
});

/**
 * @deprecated
 */
export const registerRequested = () => ({
  type: REGISTER_REQUESTED
});

export const registerSucceeded = (user) => ({
  type: REGISTER_SUCCEEDED,
  payload: user
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  error
});