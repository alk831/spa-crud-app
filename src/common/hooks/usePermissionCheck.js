import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function usePermissionCheck({
  allowedRole,
  strictRole = false,
}) {
  const userRole = useSelector(state => state.authorization.user.role);
  const roles = useSelector(state => state.authorization.roles);

  // return true;

  if (!roles.length) {
    return false;
  }

  const userRoleIndex = roles.findIndex(role => role === userRole);
  const allowedRoleIndex = roles.findIndex(role => role === allowedRole);

  if (userRole === allowedRole) {
    return true;
  }
  
  if (!strictRole && userRoleIndex >= allowedRoleIndex) {
    return true;
  }

  return false;
}

usePermissionCheck.propTypes = {
  allowedRole: PropTypes.any,
  strictRole: PropTypes.bool
}