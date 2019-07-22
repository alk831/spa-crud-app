import React from 'react';
import css from './style.scss';

export const Authorization = ({ children }) => {
  return (
    <main className={css.container}>
      {children}
    </main>
  );
}