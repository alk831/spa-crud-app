import { useSelector } from 'react-redux';
import { checkPermissionsOf } from '../../middleware';

/**
 * Checks if user has equal role, or if inherits specified role if strict check is disabled.
 * @param {null|string} allowedGroup Name of the group that has permissions for this resource.
 * @param {boolean} inheritance If set to false, it disables group permission inheritance.
 * @returns {boolean} Permission status. 
 */
export function usePermissionsOf(allowedGroup, inheritance = true) {
  const userGroup = useSelector(state => state.authorization.group);
  const groups = useSelector(state => state.authorization.groups);

  const hasPermissions = checkPermissionsOf({
    allowedGroup,
    inheritance,
    userGroup,
    groups
  });

  return hasPermissions;
}