import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../../store/actions';
import css from './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../components/Form';

const MIN_EMAIL_LENGTH = 4;
const MIN_PASS_LENGTH = 4;

const formData = {
  login: {
    title: 'Logowanie',
    buttonTitle: 'Zaloguj się',
    info: (
      <p className={css.registration_info}>
        Nie masz konta?{' '}
        <Link to="/register">
          Zarejestruj się
        </Link>
      </p>
    )
  },
  register: {
    title: 'Rejestracja',
    buttonTitle: 'Zarejestruj się',
    info: (
      <p className={css.registration_info}>
        Posiadasz już konto?{' '}
        <Link to="/login">
          Zaloguj się
        </Link>
      </p>
    )
  }
}

const Authorization = ({ history, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  
  async function handleAuthentication(event) {
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
      await dispatch(Actions[mode](email, password));
      history.push('/');
    } catch(err) {
      const { status } = err.response;

      if (status === 401) {
        setError('Nieprawidłowy email lub hasło');
      } else {
        setError('Wystąpił nieoczekiwany błąd serwera');
      }

      setIsLoading(false);
    }
  }

  return (
    <main className={css.container}>
      <Form
        onSubmit={handleAuthentication}
        error={error}
        {...formData[mode]}
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
    </main>
  );
}

Authorization.propTypes = {
  mode: PropTypes.oneOf(['login', 'register'])
}

const AuthorizationWithRouter = withRouter(Authorization);

export { AuthorizationWithRouter as Authorization };