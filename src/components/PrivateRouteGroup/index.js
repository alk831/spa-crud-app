import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { Redirect, Route } from './node_modules/react-router-dom';
import { usePermissionCheck } from '../../common/hooks';


export const PrivateRouteGroup = ({
  role: allowedRole,
  strict: strictRole,
  redirectTo,
  children
}) => {
  const hasPermissions = usePermissionCheck({ allowedRole, strictRole });

  return React.Children.map(children, child => {
    const { component: Component, ...props } = child.props;
    return (
      <Route
        {...props}
        render={props => hasPermissions ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )}
      />
    )
  });
}

PrivateRouteGroup.propTypes = {
  /** Role that will have access to this route/s. */
  role: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  /**
   * Disables/enables group permission inheritance.
   * If set to true, it will require to have exactly the same group as provided.
   */
  strict: PropTypes.bool,
  /** Adress of the page that user will be redirected to, if He has no permissions. */
  redirectTo: PropTypes.string.isRequired
}