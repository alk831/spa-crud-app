import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../store/actions';
import css from './style.scss';
import { Link } from 'react-router-dom';

import { BasicButton } from '../../components/BasicButton';
import { FormField } from '../../components/FormField';
import { Authorization } from '../../layouts/Authorization';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErr, setValidationErr] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.authorization);
  
  async function handleLogin(event) {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (validationErr) {
      setValidationErr(null);
    }

    const hasLoggedIn = await dispatch(login(email, password));
  
    if (hasLoggedIn) {
      history.push('/');
    }
  }

  return (
    <Authorization title="Logowanie">
      <form onSubmit={handleLogin}>
        <FormField
          label="Email:"
          type="email"
          placeholder="Adres email"
          value={email}
          onChange={value => setEmail(value)}
        />
        <FormField
          label="Hasło:"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={value => setPassword(value)}
        />
        {!isLoading && (
          error ? error : validationErr
        )}
        <p className={css.registration_info}>
          Nie masz konta?{' '}
          <Link to="/register">
            Zarejestruj się
          </Link>
        </p>
        <BasicButton
          className={css.submit_btn}
          type="submit"
          title="Zaloguj się"
        />
      </form>
    </Authorization>
  );
}

const LoginWithRouter = withRouter(Login);

export { LoginWithRouter as Login };