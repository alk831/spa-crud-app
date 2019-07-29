import { loginSucceeded, logout } from '../creators';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  const { data: { data }} = await axios.post('/auth/login', { email, password });
  sessionStorage.setItem('auth-data', JSON.stringify(data));
  dispatch(loginSucceeded(data));
}

export const handleLogout = () => (dispatch) => {
  sessionStorage.removeItem('auth-data');
  dispatch(logout());
}

export const register = (email, password) => async (dispatch) => {
  await axios.post('/auth/register', { email, password });
  await dispatch(login(email, password));
}