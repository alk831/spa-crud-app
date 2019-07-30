import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './style.scss';
import { authLogout } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GROUP } from '../../common/consts';
import { UserInfo } from '../../components/UserInfo';
import { BasicButton } from '../../components/BasicButton';
import { checkPermissionsOf } from '../../middleware';

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
    requiredGroup: GROUP.MODERATOR
  }
]

class Dashboard extends React.Component {
  
  state = {
    error: null,
    filteredLinks: this.getFilteredLinks()
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleLogout = () => {
    this.props.authLogout();
    this.props.history.push('/login');
  }

  componentDidUpdate(prevProps) {
    const { group, groups } = this.props;
    const { group: prevGroup, groups: prevGroups } = prevProps.authorization;

    if (group !== prevGroup || groups !== prevGroups) {
      this.setState({
        filteredLinks: this.getFilteredLinks()
      });
    }
  }

  getFilteredLinks = () => dashboardLinks.filter(link => {
    if (link.requiredGroup) {
      const { group, groups } = this.props.authorization;

      const hasPermissions = checkPermissionsOf({
        allowedGroup: link.requiredGroup,
        userGroup: group,
        inheritance: true,
        groups
      });

      return hasPermissions;
    }
    return true;
  });

  render() {
    const { error, filteredLinks } = this.state;
    const { user } = this.props.authorization;

    return (
      <main className={css.container}>
        <nav className={css.menu_container}>
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
  (state) => ({ authorization: state.authorization }),
  { authLogout }
)(Dashboard);

const DashboardWithRouter = withRouter(ConnectedDashboard);

export { DashboardWithRouter as Dashboard };