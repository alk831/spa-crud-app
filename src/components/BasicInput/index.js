import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';

export const BasicInput = ({
  type = 'text',
  align = 'left',
  className,
  ...props
}) => (
  <input
    type={type}
    {...applyCss(
      css.container,
      css[`align_${align}`],
      className
    )}
    {...props}
  />
);