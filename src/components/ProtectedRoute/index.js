import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { usePermissionCheck } from '../../common/hooks';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({
  role: allowedRole,
  strictRole = true,
  component: Component,
  redirectTo,
  ...props
}) => {
  const hasPermissions = usePermissionCheck(allowedRole, strictRole);

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

ProtectedRoute.propTypes = {
  /** Role that will have access to this route/s. */
  role: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  /**
   * Disables/enables group permission inheritance.
   * If set to true, it will require to have exactly the same group as provided.
   */
  strictRole: PropTypes.bool,
  /** Adress of the page that user will be redirected to, if He has no permissions. */
  redirectTo: PropTypes.string.isRequired
}