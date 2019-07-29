import React from 'react';
import css from './style.scss';

export const UserInfo = ({ user }) => {
  return (
    <figure className={css.container}>
      <figcaption>Witaj {user.email}</figcaption>
      <img
        className={css.avatar}
        src={user.avatarUrl || "/assets/img/avatar_placeholder.png"}
        alt={`${user.name || user.email}'s avatar`}
      />
    </figure>
  );
}