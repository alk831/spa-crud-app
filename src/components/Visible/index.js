import React from 'react';
import { usePermissionsOf } from '../../common/hooks';

export const Visible = ({
  for: allowedGroup,
  strict,
  children
}) => {
  const hasPermissions = usePermissionsOf(allowedGroup, strict);
  if (hasPermissions) {
    return children;
  }
  return null;
}