import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import PropTypes from 'prop-types';

export const RoundedButton = ({
  className,
  icon: Icon,
  ...props
}) => (
  <button
    {...applyCss(
      css.container,
      css.rose
    )}
    {...props}
  >
    <Icon className={css.icon} />
  </button>
);

RoundedButton.propTypes = {
  theme: PropTypes.oneOf(['rose', 'green'])
}