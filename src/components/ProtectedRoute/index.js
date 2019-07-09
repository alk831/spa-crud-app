import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthorizationContext } from '../../context/Authorization';

export const ProtectedRoute = ({
  component: Component,
  role = 'user',
  ...props
}) => {
  const [authData] = useContext(AuthorizationContext);
  const hasPermissions = authData.isLoggedIn && authData.role === role;

  return (
    <Route
      {...props}
      render={(props) => (
        hasPermissions ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      )}
    />
  );
}