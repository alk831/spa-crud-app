import React from 'react';
import { Redirect } from 'react-router-dom';
import css from './style.scss';
import { authLogout } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GROUP } from '../../common/consts';
import { NavMenu } from '../../components/NavMenu';
import { checkPermissionsOf } from '../../middleware';
import { InfoMessage } from '../../components/InfoMessage';

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
    const { message } = error;
    return { error: message };
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
    const { filteredLinks } = this.state;
    const { user } = this.props.authorization;
    const error = this.state.error || this.props.appError;

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
          {error
            ? <InfoMessage text={error} theme="error" />
            : this.props.children
          }
        </article>
      </main>
    );
  }
}

const ConnectedDashboard = connect(
  (state) => ({
    authorization: state.authorization,
    appError: state.application.error
  }),
  { authLogout }
)(Dashboard);

const DashboardWithRouter = withRouter(ConnectedDashboard);

export { DashboardWithRouter as Dashboard };