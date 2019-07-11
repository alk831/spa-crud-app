import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/main.scss';
import { useSelector } from 'react-redux';

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
  const isLoggedIn = useSelector(state => state.authorization.isLoggedIn);
  return (
    <Router>
      <AuthorizationProvider>
        <Header />
        <Switch>
          <PermissionGroup
            role={null}
            strictRole={true}
            redirectTo="/home"
            noInherit
          >
            <Route path="/login/" component={Login} />
            <Route path="/register/" component={Register} />
          </PermissionGroup>
          <SafeRoute
            path="/login/"
            component={Login}
            isAllowed={!isLoggedIn}
            redirectTo="/home"
          />
          <Route path="/register/" component={Register} />
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/my-cards/" component={MyCards} />
        </Switch>
      </AuthorizationProvider>
    </Router>
  );
}

export const AppWithHMR = hot(App);