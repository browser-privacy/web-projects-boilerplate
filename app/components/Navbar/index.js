// @TODO: Refactor this component

/**
 *
 * Navbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLifeRing,
  faCog,
  faUnlockAlt,
  faHome,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink as RRNavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLoggedIn } from '../../containers/Auth/selectors';
import { logOutAction } from '../../containers/Auth/actions';
import {
  makeSelectUsername,
  makeSelectIsEmailConfirmed,
} from '../../containers/App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class NavbarComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  handleClick() {
    const { isOpen } = this.state;

    if (isOpen) this.toggle();
  }

  navbarLinks() {
    const { isLoggedIn, username, signOut } = this.props;
    const { isOpen } = this.state;

    const links = {
      logged: [
        <Nav key="nav" className="ml-auto align-items-center" navbar>
          <UncontrolledDropdown key="user-options" nav>
            <DropdownToggle nav caret>
              <FontAwesomeIcon
                icon={faUserAlt}
                className="fa-lg navbar-user-icon"
              />

              <span className="navbar-user-username">{username}</span>
            </DropdownToggle>
            <DropdownMenu right>
              {this.dropdownMenuLinks()}
              <DropdownItem divider />
              <DropdownItem onClick={() => signOut()}>
                <FontAwesomeIcon
                  icon={faUnlockAlt}
                  className="align-text-top mr-1"
                />
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>,
      ],
      notLogged: [
        <NavbarToggler key="navbar-toggler" onClick={this.toggle} />,
        <Collapse key="navbar-collapse" isOpen={isOpen} navbar>
          <Nav className="ml-auto align-items-center" navbar>
            <NavItem key="register" onClick={this.handleClick}>
              <NavLink
                to="/register"
                exact
                activeClassName="active"
                tag={RRNavLink}
              >
                <Button color="primary">
                  <strong>Sign up</strong>
                </Button>
              </NavLink>
            </NavItem>
            <NavItem key="login" onClick={this.handleClick}>
              <NavLink
                to="/auth/login"
                exact
                activeClassName="active"
                className="text-light"
                tag={RRNavLink}
              >
                Log In
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>,
      ],
    };

    if (isLoggedIn) return links.logged;

    return links.notLogged;
  }

  dropdownMenuLinks() {
    const { isUserEmailConfirmed, location, history } = this.props;

    const links = [];

    if (!location.pathname.startsWith('/dashboard')) {
      links.push(
        <DropdownItem
          key="dropdownitem-dashboard"
          onClick={() => history.push('/dashboard')}
        >
          <FontAwesomeIcon icon={faHome} className="align-text-top mr-1" />
          Dashboard
        </DropdownItem>,
      );
    } else {
      if (isUserEmailConfirmed) {
        links.push(
          <DropdownItem
            key="dropdownitem-settings"
            onClick={() => history.push('/dashboard/user/settings')}
          >
            <FontAwesomeIcon icon={faCog} className="align-text-top mr-1" />
            Settings
          </DropdownItem>,
        );
      }

      links.push(
        <DropdownItem key="dropdownitem-support">
          <FontAwesomeIcon icon={faLifeRing} className="align-text-top mr-1" />
          Contact support
        </DropdownItem>,
      );
    }

    return links;
  }

  render() {
    const { navbarBrandLink } = this.props;

    return (
      <header>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavLink
              to={navbarBrandLink}
              tag={RRNavLink}
              className="navbar-brand navbar-brandname"
              onClick={this.handleClick}
            >
              <NavbarBrand tag="span">
                Domain.io
                <span className="beta-icon align-text-bottom">beta</span>
              </NavbarBrand>
            </NavLink>

            {this.navbarLinks()}
          </Container>
        </Navbar>
      </header>
    );
  }
}

NavbarComponent.defaultProps = {
  navbarBrandLink: '/',
};
NavbarComponent.propTypes = {
  navbarBrandLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isUserEmailConfirmed: PropTypes.bool,
  username: PropTypes.string,
  signOut: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  username: makeSelectUsername(),
  isUserEmailConfirmed: makeSelectIsEmailConfirmed(),
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(logOutAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(NavbarComponent);
