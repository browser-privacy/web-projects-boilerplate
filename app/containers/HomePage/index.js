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
// import PropTypes from 'prop-types';
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
    return (
      <div>
        <Helmet>
          <title>Homepage</title>
          <meta name="description" content="Domain.io homepage" />
        </Helmet>
        <Jumbotron className="text-center">
          <Container>
            <Row>
              <Col>
                <h1 className="homepage-intro-header">Intro text</h1>
              </Col>
            </Row>
            <Row>
              <Col md="2" />
              <Col md="8">
                <p className="homepage-intro-text">Sub intro text</p>
              </Col>
              <Col md="2" />
            </Row>
            <Row className="center-xs">
              <Col xs="12">
                <Button
                  key="demo-button"
                  size="lg"
                  color="info"
                  className="homepage-intro-cta"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="align-text-top mr-2"
                  />
                  WATCH DEMO
                </Button>
                <Link key="register-button" to="/auth/register">
                  <Button
                    size="lg"
                    color="primary"
                    className="homepage-intro-cta"
                  >
                    <strong>GET STARTED</strong>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <main role="main" className="container">
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{' '}
            <code>body &gt; .container</code>.
          </p>
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{' '}
            <code>body &gt; .container</code>.
          </p>
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{' '}
            <code>body &gt; .container</code>.
          </p>
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{' '}
            <code>body &gt; .container</code>.
          </p>
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{' '}
            <code>body &gt; .container</code>.
          </p>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  // isLogged: PropTypes.bool,
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
