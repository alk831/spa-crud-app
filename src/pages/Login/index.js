import React, { useState } from 'react';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  
  async function handleLogin(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Login:
          <input
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
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
          Zaloguj się
        </button>
      </form>
    </div>
  );
}