import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';

export const App = () => {
  return (
    <Router>
      <AuthorizationProvider>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/login/" component={Login} />
      </AuthorizationProvider>
    </Router>
  );
}