import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import PropTypes from 'prop-types';

export const BasicInput = ({
  type = 'text',
  align = 'left',
  className,
  ...props
}) => (
  <input
    type={type}
    data-testid="BasicInput"
    {...applyCss(
      css.container,
      css[`align_${align}`],
      className
    )}
    {...props}
  />
);

BasicInput.propTypes = {
  type: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string
}