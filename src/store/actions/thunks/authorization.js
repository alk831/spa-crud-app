import { authLoggedOut, authLoggedIn } from '../creators';
import axios from 'axios';
import { AUTH_DATA } from '../../../common/consts';

export const authLogin = (email, password) => async (dispatch) => {
  const { data: { data }} = await axios.post('/auth/login', { email, password });
  sessionStorage.setItem(AUTH_DATA, JSON.stringify(data));
  dispatch(authLoggedIn(data));
}

export const authRegister = (email, password) => async (dispatch) => {
  await axios.post('/auth/register', { email, password });
  await dispatch(authLogin(email, password));
}

export const authLogout = () => (dispatch) => {
  sessionStorage.removeItem(AUTH_DATA);
  dispatch(authLoggedOut());
}