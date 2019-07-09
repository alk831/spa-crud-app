import React, { useContext } from 'react';
import { Redirect, Route,  } from 'react-router-dom';
import { AuthorizationContext } from '../../context/Authorization';

export const ProtectedRoute = ({
  component: Component,
  role: allowedRole = 'user',
  ...props
}) => {
  const [{ isLoggedIn, role }] = useContext(AuthorizationContext);
  return (
    <Route
      {...props}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to="/login" />;
        }
        if (allowedRole !== role) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}