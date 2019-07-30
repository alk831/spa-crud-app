import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import css from './style.scss';
import { authLogout } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GROUP } from '../../common/consts';
import { UserInfo } from '../../components/UserInfo';
import { BasicButton } from '../../components/BasicButton';
import { checkPermissionsOf } from '../../middleware';
import MenuIcon from '../../assets/img/menu.svg';
import { applyCss } from '../../common/utils';

const dashboardLinks = [
  {
    path: '/',
    title: 'Strona główna',
  },
  {
    path: '/my-cards',
    title: 'Moje karty',
  },
  {
    path: '/users',
    title: 'Użytkownicy',
    allowedGroup: GROUP.MODERATOR
  }
]

class Dashboard extends React.Component {

  static getDerivedStateFromError(error) {
    return { error };
  }
  
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      hasPermissions: this.getPermissionStatus(props.group),
      filteredLinks: this.getFilteredLinks(),
      isMenuOpened: false
    }
  }

  getPermissionStatus(allowedGroup, inheritance = true) {
    return checkPermissionsOf({
      userGroup: this.props.authorization.group,
      groups: this.props.authorization.groups,
      allowedGroup,
      inheritance
    });
  }

  handleLogout = () => {
    this.props.authLogout();
    this.props.history.push('/login');
  }

  getFilteredLinks = () => dashboardLinks.filter(link => {
    if (link.allowedGroup) {
      const hasPermissions = this.getPermissionStatus(
        link.allowedGroup
      );
      return hasPermissions;
    }
    return true;
  });

  render() {
    const { error, filteredLinks } = this.state;
    const { user } = this.props.authorization;

    if (!this.state.hasPermissions) {
      return <Redirect to="/login" />;
    }

    return (
      <main className={css.container}>
        <button
          className={css.menu_button}
          onClick={() => this.setState({ isMenuOpened: true })}
        >
          <MenuIcon fill="#101E45" />
        </button>
        <nav {...applyCss(
          css.menu_container,
          this.state.isMenuOpened && css.menu_container__opened
        )}>
          <UserInfo user={user} />
          <ul className={css.menu_list}>
            {filteredLinks.map(link => (
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
            onClick={this.handleLogout}
            theme="white"
          >
            Wyloguj się
          </BasicButton>
        </nav>
        {this.state.isMenuOpened && (
          <div
            className={css.menu_background}
            onClick={() => this.setState({ isMenuOpened: false })}
          ></div>
        )}
        <article className={css.content_container}>
          {error ? (
            <div>
              Wysątpił błąd: 
              <p>{error.message}</p>
            </div>
          ) : this.props.children}
        </article>
      </main>
    );
  }
}

const ConnectedDashboard = connect(
  (state) => ({ authorization: state.authorization }),
  { authLogout }
)(Dashboard);

const DashboardWithRouter = withRouter(ConnectedDashboard);

export { DashboardWithRouter as Dashboard };