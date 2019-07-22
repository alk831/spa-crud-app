import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../store/actions';
import css from './style.scss';
import { Link } from 'react-router-dom';

import { Form, FormField } from '../../components/Form';
import { Authorization } from '../../layouts/Authorization';

const MIN_EMAIL_LENGTH = 4;
const MIN_PASS_LENGTH = 4;

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  async function handleLogin(event) {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (error) {
      setError(null);
    }

    if (email.length < MIN_EMAIL_LENGTH) {
      return setError(
        `Adres email musi zawierać przynajmniej ${MIN_EMAIL_LENGTH} znaków`
      );
    }
    if (password.length < MIN_PASS_LENGTH) {
      return setError(
        `Hasło musi zawierać przynajmniej ${MIN_PASS_LENGTH} znaków`
      );
    }

    try {
      setIsLoading(true);
      await dispatch(login(email, password));
      history.push('/');
    } catch(err) {
      const { status } = err.response;

      if (status === 401) {
        setError('Nieprawidłowy email lub hasło');
      } else {
        setError('Wystąpił nieoczekiwany błąd serwera');
      }
    } finally {
      setIsLoading(false);
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