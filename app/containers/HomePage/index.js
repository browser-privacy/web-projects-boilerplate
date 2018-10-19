/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { makeSelectIsLogged } from '../Auth/selectors';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    const { isLogged } = this.props;

    function CTAButtons() {
      if (isLogged)
        return [
          <Link key="register-button" to="/dashboard/index">
            <Button size="lg" color="primary">
              <strong>Go to Dashboard</strong>
            </Button>
          </Link>,
        ];

      return [
        <Button
          key="demo-button"
          size="lg"
          color="info"
          className="homepage-intro-cta"
        >
          <FontAwesomeIcon icon={faPlay} className="align-text-top mr-2" />
          Watch demo
        </Button>,
        <Link key="register-button" to="/auth/register">
          <Button size="lg" color="primary" className="homepage-intro-cta">
            <strong>Sign up free</strong>
          </Button>
        </Link>,
      ];
    }

    return (
      <main>
        <Helmet>
          <title>Homepage</title>
          <meta name="description" content="Domain.io homepage" />
        </Helmet>
      </main>
    );
  }
}

HomePage.propTypes = {
  isLogged: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
