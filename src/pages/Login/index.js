import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { minEmailLength, minPasswordLength } from '../../common/consts';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErr, setValidationErr] = useState(null);
  const dispatch = useDispatch();
  const { isLoggingIn, error } = useSelector(state => state.authorization);
  
  async function handleLogin(event) {
    event.preventDefault();
    if (isLoggingIn) {
      return;
    }
    if (validationErr) {
      setValidationErr(null);
    }

    if (email.length < minEmailLength) {
      return setValidationErr(`Email musi mieć przynajmniej ${minEmailLength} znaków.`);
    }
    if (password.length < minPasswordLength) {
      return setValidationErr(`Hasło musi mieć przynajmniej ${minPasswordLength} znaków`);
    }

    const result = await dispatch(login(email, password));
  
    if (result) {
      history.push('/');
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {!isLoggingIn && (
          error ? error : validationErr
        )}
        <button type="submit">
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

const LoginWithRouter = withRouter(Login);

export { LoginWithRouter as Login };