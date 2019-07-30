import React from 'react';
import { Redirect } from 'react-router-dom';
import css from './style.scss';
import { authLogout } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GROUP } from '../../common/consts';
import { NavMenu } from '../../components/NavMenu';
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
        <NavMenu
          links={filteredLinks}
          user={user}
          handleLogout={this.handleLogout}
        />
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