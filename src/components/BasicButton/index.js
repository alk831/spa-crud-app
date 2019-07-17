import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';

export const BasicButton = ({
  children,
  className,
  ...props
}) => (
  <button
    {...applyCss(css.container, className)}
    {...props}
  >
    {children}
  </button>
);