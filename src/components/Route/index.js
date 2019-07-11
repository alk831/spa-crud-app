import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const SafeRoute = ({
  component: Component,
  redirectTo,
  isAllowed,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props) => isAllowed ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      )}
    />
  );
}

Route.propTypes = {
  component: PropTypes.func,
  redirectTo: PropTypes.string,
  isAllowed: PropTypes.bool
}