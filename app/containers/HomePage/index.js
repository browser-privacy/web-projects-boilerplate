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
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { makeSelectIsLogged } from '../Auth/selectors';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    // const { isLogged } = this.props;

    /* function CTAButtons() {
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
        <Link key="register-button" to="/register">
          <Button size="lg" color="primary" className="homepage-intro-cta">
            <strong>Sign up free</strong>
          </Button>
        </Link>,
      ];
    } */

    return (
      <main className="d-flex flex-column flex-grow-1">
        <Helmet>
          <title>Homepage</title>
          <meta name="description" content="Domain.io homepage" />
        </Helmet>
        <section className="jumbotron text-center mb-0">
          <div className="container">
            <h1 className="jumbotron-heading">Intro title</h1>
            <p className="lead">
              Make it short and sweet, but not too short so folks dont simply
              skip over it entirely.
            </p>
            <p>
              <Link to="/register">
                <Button color="primary" size="lg">
                  Sign up free
                </Button>
              </Link>
            </p>
          </div>
        </section>
        <Container className="d-flex flex-column flex-grow-1 justify-content-center">
          <Row className="mb-5">
            <Col>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscin</h1>
              <p className="lead">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum{' '}
                <code>padding-top: 60px;</code> liquip ex ea commodo consequat{' '}
                <code>body &gt; .container</code>. sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid <strong>ex ea commodi consequatur?</strong>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <h2>Heading</h2>
              <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Etiam porta sem malesuada
                magna mollis euismod. Donec sed odio dui.{' '}
              </p>
              <p>
                <Button color="secondary">View details »</Button>
              </p>
            </Col>
            <Col md="4">
              <h2>Heading</h2>
              <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Etiam porta sem malesuada
                magna mollis euismod. Donec sed odio dui.{' '}
              </p>
              <p>
                <Button color="secondary">View details »</Button>
              </p>
            </Col>
            <Col md="4">
              <h2>Heading</h2>
              <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Etiam porta sem malesuada
                magna mollis euismod. Donec sed odio dui.{' '}
              </p>
              <p>
                <Button color="secondary">View details »</Button>
              </p>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

// HomePage.propTypes = {
//   // isLogged: PropTypes.bool,
// };

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
