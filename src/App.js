import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GROUP } from './common/consts';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { MyCards } from './pages/MyCards';
import { Users } from './pages/Users';
import { Dashboard } from './layouts/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App = () => {
  return (
    <>
      <Helmet
        titleTemplate="%s - Card picker"
      />
      <Router>
        <Switch>
          <PrivateRoute
            path="/login/"
            component={Login}
            group={GROUP.NONE}
            strictGroup
            redirectTo="/"
          />
          <PrivateRoute
            path="/register/"
            component={Register}
            group={GROUP.NONE}
            strictGroup
            redirectTo="/"
          />
          <Dashboard path="/" group={GROUP.USER}>
            <Route
              path="/"
              exact
              component={Home}
            />
            <Route
              path="/my-cards/"
              component={MyCards}
            />
            <PrivateRoute
              path="/users/"
              component={Users}
              group={GROUP.MODERATOR}
            />
          </Dashboard>
        </Switch>
      </Router>
    </>
  );
}

export const AppWithHMR = hot(App);