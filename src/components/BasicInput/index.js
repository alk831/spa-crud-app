import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';

export const BasicInput = ({
  type = 'text',
  className,
  ...props
}) => (
  <input
    type={type}
    {...applyCss(css.container, className)}
    {...props}
  />
);