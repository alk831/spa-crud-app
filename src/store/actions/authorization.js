import {
  LOGOUT,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED
} from '../consts';
import axios from 'axios';

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
  const { data: { data }} = await axios.post('/auth/login', { email, password });
  sessionStorage.setItem('auth-data', JSON.stringify(data));
  dispatch(loginSucceeded(data));
}

export const logout = () => ({
  type: LOGOUT 
});

export const handleLogout = () => (dispatch) => {
  sessionStorage.removeItem('auth-data');
  dispatch(logout());
}

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
  await axios.post('/auth/register', { email, password });
  await dispatch(login(email, password));
}