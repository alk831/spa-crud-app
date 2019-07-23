import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../../store/actions';
import css from './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../components/Form';

const formData = {
  login: {
    title: 'Logowanie',
    buttonTitle: 'Zaloguj się',
    info: (
      <p className={css.registration_info}>
        Nie masz konta?{' '}
        <Link
          to="/register"
          className={css.info_link}
        >
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
        <Link
          to="/login"
          className={css.info_link}
        >
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
    const minEmailLenght = 4;
    const minPassLength = 4;
    const actionName = mode;

    if (isLoading) {
      return;
    }
    if (error) {
      setError(null);
    }

    if (email.length < minEmailLenght) {
      return setError(
        `Adres email musi zawierać przynajmniej ${minEmailLenght} znaków`
      );
    }
    if (password.length < minPassLength) {
      return setError(
        `Hasło musi zawierać przynajmniej ${minPassLength} znaków`
      );
    }

    try {
      setIsLoading(true);
      await dispatch(Actions[actionName](email, password));
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
        isLoading={isLoading}
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