import React from 'react';
import css from './style.scss';
import { BasicButton } from '../BasicButton';
import { BasicInput } from '../BasicInput';

export const Form = ({
  onSubmit,
  isLoading,
  error,
  info,
  children,
  title,
  buttonTitle
}) => (
    <form onSubmit={onSubmit}>
      <h1 className={css.heading}>{title}</h1>
      {children}
      {!isLoading && error && (
        <p className={css.error_info} data-testid="Form__error">
          {error}.
        </p>
      )}
      {info}
      <BasicButton
        type="submit"
        className={css.submit_btn}
        title={buttonTitle}
        isLoading={isLoading}
      />
    </form>
);

export const FormField = ({
  label,
  onChange,
  ...inputProps
}) => (
  <div className={css.field}>
    <label>
      <span className={css.field_title}>
        {label}
      </span>
      <BasicInput
        {...inputProps}
        className={css.input}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  </div>
);