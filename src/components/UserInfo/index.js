import React from 'react';
import css from './style.scss';
import avatarPlaceholder from '../../assets/img/avatar_placeholder.png';
import PropTypes from 'prop-types';

export const UserInfo = ({ user }) => {
  return (
    <figure className={css.container}>
      <figcaption>Witaj {user.email}</figcaption>
      <img
        className={css.avatar}
        src={avatarPlaceholder}
        alt={`${user.name || user.email}'s avatar`}
      />
    </figure>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object
}