import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { minEmailLength, minPasswordLength } from '../../common/consts';
import { login } from '../../store/actions';
import css from './style.scss';

import { BasicInput } from '../../components/BasicInput';
import { BasicButton } from '../../components/BasicButton';
import { FormField } from '../../components/FormField';

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

    const result = await dispatch(login(email, password));
  
    if (result) {
      history.push('/');
    }
  }

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Logowanie</h1>
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
        <BasicButton
          className={css.submit_btn}
          type="submit"
          title="Zaloguj się"
        />
      </form>
    </div>
  );
}

const LoginWithRouter = withRouter(Login);

export { LoginWithRouter as Login };