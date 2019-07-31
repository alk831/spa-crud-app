import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserInfo } from '../UserInfo';
import { BasicButton } from '../BasicButton';
import MenuIcon from '../../assets/img/menu.svg';
import { applyCss } from '../../common/utils';
import PropTypes from 'prop-types';
import css from './style.scss';

export const NavMenu = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        className={css.menu_button}
        onClick={() => setIsOpened(true)}
      >
        <MenuIcon fill="#101E45" />
      </button>
      <nav {...applyCss(
        css.menu_container,
        isOpened && css.menu_container__opened
      )}>
        <UserInfo user={props.user} />
        <ul className={css.menu_list}>
          {props.links.map(link => (
            <li key={link.title}>
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
          onClick={props.handleLogout}
          theme="white"
        >
          Wyloguj się
        </BasicButton>
      </nav>
      {isOpened && (
        <div
          className={css.menu_background}
          onClick={() => setIsOpened(false)}
        ></div>
      )}
    </>
  );
}

NavMenu.propTypes = {
  user: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired
}