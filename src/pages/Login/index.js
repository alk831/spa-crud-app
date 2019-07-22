import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../store/actions';
import css from './style.scss';
import { Link } from 'react-router-dom';

import { FormField } from '../../components/FormField';
import { Form } from '../../components/Form';
import { Authorization } from '../../layouts/Authorization';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState('Wystąpił nieoczekiwany błąd serwera');
  const { isLoading } = useSelector(state => state.authorization);
  
  async function handleLogin(event) {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (error) {
      setError(null);
    }

    const loginError = await dispatch(login(email, password));

    if (loginError != null) {
      const { status } = loginError;

      if (status === 401) {
        setError('Nieprawidłowy email lub hasło.');
      } else {
        setError('Wystąpił nieoczekiwany błąd serwera.');
      }
    } else {
      history.push('/');
    }
  }

  return (
    <Authorization>
      <Form
        onSubmit={handleLogin}
        error={error}
        title="Logowanie"
        buttonTitle="Zaloguj się"
        info={(
          <p className={css.registration_info}>
            Nie masz konta?{' '}
            <Link to="/register">
              Zarejestruj się
            </Link>
          </p>
        )}
      >
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
      </Form>
    </Authorization>
  );
}

const LoginWithRouter = withRouter(Login);

export { LoginWithRouter as Login };