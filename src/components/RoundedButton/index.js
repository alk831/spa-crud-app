import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import PropTypes from 'prop-types';

export const RoundedButton = ({
  className,
  mode = 'like',
  icon: Icon,
  ...props
}) => (
  <button
    {...applyCss(
      css.container,
      css[mode]
    )}
    {...props}
  >
    <Icon className={css.icon} />
  </button>
);

RoundedButton.propTypes = {
  mode: PropTypes.oneOf(['like', 'skip'])
}