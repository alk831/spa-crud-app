import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <AuthorizationProvider>
          <Header />
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
        </AuthorizationProvider>
      </Provider>
    </Router>
  );
}