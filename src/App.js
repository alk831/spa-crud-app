import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/main.scss';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';
import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';
import { Register } from './pages/Register';
import { MyCards } from './pages/MyCards';
import { PrivateRouteGroup } from './components/PrivateRouteGroup';

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
            path="/"
            exact
            component={Home}
            group="user"
            redirectTo="/login"
          />
          {/* <PermissionGroup role={null} redirectTo="/login">
            <Route path="/" exact component={Home} />
            <Route path="/my-cards/" component={MyCards} />
          </PermissionGroup> */}
        {/* </Switch> */}
      </AuthorizationProvider>
    </Router>
  );
}

export const AppWithHMR = hot(App);