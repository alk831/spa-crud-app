import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';

export const RowPlaceholder = ({ index = 0 }) => (
  <li {...applyCss(
    css.row_container,
    css[`row_${index + 1}`]
  )}>
  </li>
);

export const ListPlaceholder = ({
  length = 5
}) => (
  <ul className={css.list_container}>
    {Array.from({ length }, ((_, index) => (
      <RowPlaceholder
        key={index}
        index={index}
      />
    )))}
  </ul>
);

export const CardPlaceholder = () => (
  <div className={css.card_container}>
  </div>
);