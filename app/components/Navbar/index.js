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
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink as RRNavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLogged } from '../../containers/Auth/selectors';
import { logOutAction } from '../../containers/Auth/actions';
import { makeSelectUsername } from '../../containers/App/selectors';

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
    const { isLogged, username, signOut } = this.props;
    const { isOpen } = this.state;

    const links = {
      logged: [
        <Nav key="nav" className="ml-auto align-items-center" navbar>
          <UncontrolledDropdown key="user-options" nav inNavbar>
            <DropdownToggle nav caret>
              <img
                key="user-avatar"
                src="https://res.cloudinary.com/coinbase/image/upload/c_fill,h_128,w_128/q8x14xbptmjcusxmolwl.png"
                alt="user avatar"
                className="navbar-user-img"
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
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>,
      ],
      notLogged: [
        <NavbarToggler key="navbar-toggler" onClick={this.toggle} />,
        <Collapse key="navbar-collapse" isOpen={isOpen} navbar>
          <Nav className="ml-auto align-items-center" navbar>
            <NavItem key="login" onClick={this.handleClick}>
              <NavLink
                to="/auth/login"
                exact
                activeClassName="active"
                tag={RRNavLink}
              >
                Sign In
              </NavLink>
            </NavItem>
            <NavItem key="register" onClick={this.handleClick}>
              <NavLink
                to="/auth/register"
                exact
                activeClassName="active"
                tag={RRNavLink}
              >
                <Button color="primary">
                  <strong>Get started</strong>
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>,
      ],
    };

    if (isLogged) return links.logged;

    return links.notLogged;
  }

  dropdownMenuLinks() {
    const { location, history } = this.props;

    const links = [];

    if (!location.pathname.startsWith('/dashboard')) {
      links.push(
        <DropdownItem
          key="dropdownitem-dashboard"
          onClick={() => history.push('/dashboard/index')}
        >
          <FontAwesomeIcon icon={faHome} className="align-text-top mr-1" />
          Dashboard
        </DropdownItem>,
      );
    } else {
      links.push(
        <DropdownItem
          key="dropdownitem-settings"
          onClick={() => history.push('/dashboard/user/settings')}
        >
          <FontAwesomeIcon icon={faCog} className="align-text-top mr-1" />
          Settings
        </DropdownItem>,
        <DropdownItem key="dropdownitem-support">
          <FontAwesomeIcon icon={faLifeRing} className="align-text-top mr-1" />
          Contact support
        </DropdownItem>,
      );
    }

    return links;
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavLink
              to="/"
              tag={RRNavLink}
              className="navbar-brand navbar-brandname"
              onClick={this.handleClick}
            >
              <span>
                <FontAwesomeIcon
                  icon={faRocket}
                  className="align-text-top mr-2"
                />
                Domain.io
                <span className="beta-icon align-text-bottom">beta</span>
              </span>
            </NavLink>
            {this.navbarLinks()}
          </Container>
        </Navbar>
      </div>
    );
  }
}

NavbarComponent.propTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
  signOut: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectIsLogged(),
  username: makeSelectUsername(),
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(logOutAction());
    },
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
