import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { AuthorizationContext } from '../../context/Authorization';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [, setAuthData] = useContext(AuthorizationContext);
  
  async function handleRegister(event) {
    event.preventDefault();
    if (isRegistering) return;

    try {
      setIsRegistering(true);

      const credentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      setAuthData(credentials);

      history.push('/');

    } catch(err) {
      setError(err.message);
    } finally {
      setIsRegistering(false);
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
        <button type="submit">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}

const RegisterWithRouter = withRouter(Register);

export { RegisterWithRouter as Register };