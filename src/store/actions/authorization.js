import { LOGOUT, LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED, REGISTER_REQUESTED, REGISTER_SUCCEEDED, REGISTER_FAILED } from "../consts";
import firebase from 'firebase';

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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequested());

    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    dispatch(loginSucceeded(credentials));
    
  } catch (err) {
    dispatch(loginFailed(err));
  }
}

export const logout = () => ({
  type: LOGOUT 
});

export const registerRequested = () => ({
  type: REGISTER_REQUESTED
});

export const registerSucceeded = (payload) => ({
  type: REGISTER_SUCCEEDED,
  payload
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  error
});

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch(registerRequested());

    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    dispatch(registerSucceeded(credentials));

  } catch(err) {
    dispatch(registerFailed(err));
  }
}