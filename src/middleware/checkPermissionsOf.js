
export function checkPermissionsOf({
  allowedGroup,
  userGroup,
  groups,
  inheritance = true
}) {

  if (userGroup === allowedGroup) {
    return true;
  }

  if (!groups.length) {
    return false;
  }

  if (inheritance) {
    const userGroupIndex = groups.findIndex(group => group === userGroup);
    const allowedGroupIndex = groups.findIndex(group => group === allowedGroup);

    if (userGroupIndex >= allowedGroupIndex) {
      return true;
    }
  }

  return false;
}