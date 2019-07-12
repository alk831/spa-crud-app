import { useSelector } from 'react-redux';

/**
 * Checks permission status.
 * @param {null|string} allowedGroup Name of the group that has permissions for this resource.
 * @param {boolean} strictGroup If set to true, it disables group permission inheritance.
 * @returns {boolean} Permission status. 
 */
export function usePermissionCheck(allowedGroup, strictGroup = false) {
  const userGroup = useSelector(state => state.authorization.group);
  const groups = useSelector(state => state.authorization.groups);

  if (userGroup === allowedGroup) {
    return true;
  }

  if (!groups.length) {
    return false;
  }

  if (!strictGroup) {
    const userGroupIndex = groups.findIndex(group => group === userGroup);
    const allowedGroupIndex = groups.findIndex(group => group === allowedGroup);

    if (userGroupIndex >= allowedGroupIndex) {
      return true;
    }
  }

  return false;
}