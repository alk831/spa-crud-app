import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';
import PropTypes from 'prop-types';

export const InfoMessage = ({ text, theme }) => (
  <p {...applyCss(
    css.container,
    css[`theme-${theme}`]
  )}>
    {text}
  </p>
);

InfoMessage.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['error'])
}