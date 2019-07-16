import { LOGOUT, LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED, REGISTER_REQUESTED, REGISTER_SUCCEEDED, REGISTER_FAILED } from "../consts";
import firebase from 'firebase';
import { HOST } from "../../common/consts";

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

    const response = await fetch(`${HOST}/auth/login`, {
      body: JSON.stringify({ email, password }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST'
    });

    if (!response.ok) {
      dispatch(loginFailed(response.statusText));
      return false;
    }

    dispatch(loginSucceeded(await response.json()));
    return true;
    
  } catch (err) {
    dispatch(loginFailed(err));
    return false;   
  }
}

export const logout = () => ({
  type: LOGOUT 
});

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

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch(registerRequested());

    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    dispatch(registerSucceeded(user));
    return true;

  } catch(err) {
    dispatch(registerFailed(err));
    return false;
  }
}