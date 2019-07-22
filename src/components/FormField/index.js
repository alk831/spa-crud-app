import React from 'react';
import css from './style.scss';

import { BasicInput } from '../BasicInput';

export const FormField = ({
  label,
  onChange,
  ...inputProps
}) => {
  return (
    <div className={css.field}>
      <label>
        <span className={css.field_title}>
          Email:
        </span>
        <BasicInput
          {...inputProps}
          className={css.input}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}