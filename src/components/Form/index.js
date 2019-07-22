import React from 'react';
import css from './style.scss';

import { BasicButton } from '../BasicButton';

export const Form = ({
  onSubmit,
  isLoading,
  error,
  info,
  children,
  title,
  buttonTitle
}) => {

  return (
    <form onSubmit={onSubmit}>
      <h1 className={css.heading}>{title}</h1>
      {children}
      {!isLoading && error && (
        <p className={css.error_info}>
          {error}
        </p>
      )}
      {info}
      <BasicButton
        type="submit"
        className={css.submit_btn}
        title={buttonTitle}
      />
    </form>
  );
}