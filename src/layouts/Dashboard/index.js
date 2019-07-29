import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './style.scss';
import { logout } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { UserInfo } from '../../components/UserInfo';
import { BasicButton } from '../../components/BasicButton';

const dashboardLinks = [
  { title: 'Strona główna', path: '/' },
  { title: 'Moje karty', path: '/my-cards' },
  { title: 'Użytkownicy', path: '/users' },
]

class Dashboard extends React.Component {
  
  state = {
    error: null
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    const { error } = this.state;

    return (
      <main className={css.container}>
        <nav className={css.menu_container}>
          <UserInfo user={this.props.user} />
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
            onClick={this.handleLogout}
          >
            Wyloguj się
          </BasicButton>
        </nav>
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
  ({ authorization }) => ({ user: authorization.user }),
  { logout }
)(Dashboard);

const DashboardWithRouter = withRouter(ConnectedDashboard);

export { DashboardWithRouter as Dashboard };