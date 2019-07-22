import React from 'react';
import css from './style.scss';

export const Authorization = ({ children, title }) => {
  return (
    <main className={css.container}>
      <h1 className={css.heading}>{title}</h1>
      {children}
    </main>
  );
}