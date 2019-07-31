import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { usePermissionsOf } from '../../common/hooks';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
  group: allowedGroup,
  strictGroup,
  component: Component,
  redirectTo = "/login",
  ...props
}) => {
  const hasPermissions = usePermissionsOf(allowedGroup, strictGroup);

  return (
    <Route
      {...props}
      render={props => hasPermissions ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  /** group that will have access to this route/s. */
  group: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  /**
   * Disables/enables group permission inheritance.
   * If set to true, it will require to have exactly the same group as provided.
   */
  strictGroup: PropTypes.bool,
  /** Adress of the page that user will be redirected to, if He has no permissions. */
  redirectTo: PropTypes.string
}