import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import { Spinner } from '../Spinner';
import PropTypes from 'prop-types';

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

BasicButton.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  theme: PropTypes.oneOf(['blue', 'white'])
}