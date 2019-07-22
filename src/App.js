import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/global.scss';

import { Home } from './pages/Home';
import { AuthorizationProvider } from './context/Authorization';
import { PrivateRoute } from './components/PrivateRoute';
import { MyCards } from './pages/MyCards';
import { Users } from './pages/Users';
import { Authorization } from './layouts/Authorization'; 

const Login = () => (
  <Authorization mode="login" />
);

const Register = () => (
  <Authorization mode="register" />
);

export const App = () => {
  return (
    <Router>
      <AuthorizationProvider>
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
          <Route
            path="/users/"
            component={Users}
          />
        {/* </Switch> */}
      </AuthorizationProvider>
    </Router>
  );
}

export const AppWithHMR = hot(App);