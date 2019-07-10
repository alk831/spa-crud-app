import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions';

function RenderError({ isLoading, validationError, serverError }) {
  if (!isLoading) {
    if (serverError) {
      return serverError;
    }
    if (validationError) {
      return validationError;
    }
  }
  return null;
}

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErr, setValidationErr] = useState(null);
  const dispatch = useDispatch();
  const { error, isRegisteringIn } = useSelector(state => state.authorization);

  async function handleRegister(event) {
    event.preventDefault();
    const emailMinChars = 3;
    const passwordMinChars = 6;

    if (validationErr) {
      setValidationErr(null);
    }

    if (email.length < emailMinChars) {
      return setValidationErr(`Email musi mieć przynajmniej ${emailMinChars} znaków.`);
    }
    if (password.length < passwordMinChars) {
      return setValidationErr(`Hasło musi mieć przynajmniej ${passwordMinChars} znaków.`);
    }

    const result = await dispatch(register(email, password));

    if (result) {
      history.push('/');
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
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
        <RenderError
          isLoading={isRegisteringIn}
          serverError={error}
          validationError={validationErr}
        />
        <button type="submit">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}

const RegisterWithRouter = withRouter(Register);

export { RegisterWithRouter as Register };