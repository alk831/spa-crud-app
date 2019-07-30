import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import { Spinner } from '../Spinner';

export const BasicButton = ({
  title,
  children = title,
  className,
  isLoading,
  theme = 'blue',
  ...props
}) => (
  <button
    {...applyCss(
      css.container,
      css[`theme_${theme}`],
      className
    )}
    {...props}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);