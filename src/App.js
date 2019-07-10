import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { pinterest } from './config/pinterest';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './pages/Register';

PDK.init({
  appId: process.env.PIN_APP_ID,
  cookie: true
});

export const App = () => {

  useEffect(() => {
    async function fetchPins() {
      PDK.login({ scope : 'read_relationships,read_public' }, console.log)
      PDK.request('/v1/me/', console.log);
    }
    // fetchPins();
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <AuthorizationProvider>
          <Header />
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
        </AuthorizationProvider>
      </Provider>
    </Router>
  );
}