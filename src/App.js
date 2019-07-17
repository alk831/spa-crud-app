import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/main.scss';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';
import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';
import { Register } from './pages/Register';
import { MyCards } from './pages/MyCards';

export const App = () => {
  return (
    <Router>
      <AuthorizationProvider>
        <Header />
        {/* <Switch> */}
          <PrivateRoute
            path="/login/"
            component={Login}
            group={null}
            strictGroup
            redirectTo="/"
          />
          <PrivateRoute
            path="/register/"
            component={Register}
            group={null}
            strictGroup
            redirectTo="/"
          />
          <PrivateRoute
            path="/"
            exact
            component={Home}
            group={null}
            redirectTo="/login"
          />
          <PrivateRoute
            path="/my-cards/"
            component={MyCards}
            group={null}
            redirectTo="/login"
          />
        {/* </Switch> */}
      </AuthorizationProvider>
    </Router>
  );
}

export const AppWithHMR = hot(App);