import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../store/actions';

import { UserInfo } from '../../components/UserInfo';
import { BasicButton } from '../../components/BasicButton';

const dashboardLinks = [
  { title: 'Strona główna', path: '/' },
  { title: 'Moje karty', path: '/my-cards' },
  { title: 'Użytkownicy', path: '/users' },
]

export const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authorization.user);

  return (
    <main className={css.container}>
      <nav className={css.menu_container}>
        <UserInfo user={user} />
        <ul className={css.menu_list}>
          {dashboardLinks.map((link, i) => (
            <li key={i}>
              <NavLink
                className={css.menu_link}
                activeClassName={css.menu_link__active}
                to={link.path}
                exact
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <BasicButton
          className={css.logout_btn}
          onClick={() => dispatch(Actions.handleLogout())}
        >
          Wyloguj się
        </BasicButton>
      </nav>
      <article className={css.content_container}>
        {children}
      </article>
    </main>
  );
}