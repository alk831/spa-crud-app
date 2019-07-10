import React from 'react';
import { Redirect, Route,  } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({
  component: Component,
  role: allowedRole = 'user',
  ...props
}) => {
  const isLoggedIn = useSelector(state => state.authorization.isLoggedIn);
  
  return (
    <Route
      {...props}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}