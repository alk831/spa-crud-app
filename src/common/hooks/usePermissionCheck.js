import { useSelector } from 'react-redux';

export function usePermissionCheck(allowedRole, strictRole = false) {
  const userRole = useSelector(state => state.authorization.role);
  const roles = useSelector(state => state.authorization.roles);

  if (userRole === allowedRole) {
    return true;
  }

  if (!roles.length) {
    return false;
  }

  const userRoleIndex = roles.findIndex(role => role === userRole);
  const allowedRoleIndex = roles.findIndex(role => role === allowedRole);

  if (!strictRole && userRoleIndex >= allowedRoleIndex) {
    return true;
  }

  return false;
}