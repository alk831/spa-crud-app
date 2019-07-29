import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/global.scss';

import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { MyCards } from './pages/MyCards';
import { Users } from './pages/Users';
import { Authorization } from './layouts/Authorization'; 
import { Dashboard } from './layouts/Dashboard';

const Login = () => (
  <Authorization mode="login" />
);

const Register = () => (
  <Authorization mode="register" />
);

export const App = () => {
  return (
    <Router>
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
          component={() => (
            <Dashboard>
              <Home />
            </Dashboard>
          )}
          group={null}
          redirectTo="/login"
        />
        <PrivateRoute
          path="/my-cards/"
          component={() => (
            <Dashboard>
              <MyCards />
            </Dashboard>
          )}
          group={null}
          redirectTo="/login"
        />
        <Route
          path="/users/"
          component={() => (
            <Dashboard>
              <Users />
            </Dashboard>
          )}
        />
      {/* </Switch> */}
    </Router>
  );
}

export const AppWithHMR = hot(App);