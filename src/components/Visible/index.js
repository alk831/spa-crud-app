import React from 'react';
import { usePermissionCheck } from '../../common/hooks';

export const Visible = ({
  for: allowedGroup,
  strict,
  children
}) => {
  const hasPermissions = usePermissionCheck(allowedGroup, strict);
  if (hasPermissions) {
    return children;
  }
  return null;
}