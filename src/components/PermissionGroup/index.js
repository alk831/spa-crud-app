import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { SafeRoute } from '../Route';

export const PermissionGroup = ({
  allowUnlogged,
  role: allowedRole,
  inheritRole = true,
  noInherit,
  strictRole = false,
  redirectTo,
  children
}) => {
  const isLoggedIn = useSelector(state => state.authorization.isLoggedIn);
  const userRole = useSelector(state => state.authorization.user.role);
  const roles = useSelector(state => state.authorization.roles);

  return React.Children.map(children, child => (
    <SafeRoute
      {...child.props.source}
      render={({
        component: Component,
        ...props
      }) => isAllowed ? (
        <Component {...props} />
      ) : (
        <Redirect to={'/home'} />
      )}
    />
  ));
}

PermissionGroup.propTypes = {
  allowUnlogged: PropTypes.bool,
  role: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  /** Determines whenever user with higher role can access  */
  noInherit: PropTypes.bool,
  inheritRole: PropTypes.bool,
  strictRole: PropTypes.bool,
  // redirectTo: PropTypes.string.isRequired
}