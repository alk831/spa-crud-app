import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/main.scss';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthorizationProvider } from './context/Authorization';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './pages/Register';
import { MyCards } from './pages/MyCards';
import { SafeRoute } from './components/Route';
import { PermissionGroup } from './components/PermissionGroup';

export const App = () => {
  return (
    <Router>
      <AuthorizationProvider>
        <Header />
        {/* <Switch> */}
          <ProtectedRoute
            path="/login/"
            component={Login}
            role={null}
            strictRole
            redirectTo="/"
          />
          <ProtectedRoute
            path="/"
            exact
            component={Home}
            role="user"
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