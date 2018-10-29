/**
 *
 * EmailVerificationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Row, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectEmail,
  makeSelectIsEmailConfirmed,
} from '../../App/selectors';
import makeSelectEmailVerificationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { emailVerificationCheckAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EmailVerificationPage extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    this.emailVerificationCheckerInterval = setInterval(
      () => dispatch(emailVerificationCheckAction()),
      4000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.emailVerificationCheckerInterval);
  }

  render() {
    const { isUserEmailConfirmed, email } = this.props;

    if (isUserEmailConfirmed) return <Redirect to="/dashboard" />;

    return (
      <Container tag="main">
        <Helmet>
          <title>EmailConfirmationPage</title>
          <meta
            name="description"
            content="Description of EmailConfirmationPage"
          />
        </Helmet>
        <Row className="justify-content-center">
          <Col md="12" className="text-center">
            <img src="/email-verification-icon.png" alt="foo" height="224" />
            <Alert color="primary">
              <h4 className="alert-heading">
                {' '}
                Almost done... we need to{' '}
                <strong>verify your e-mail address</strong> before you can
                continue
              </h4>
              <p>
                We have sent an email with a confirmation link to your email
                address (<strong>{email}</strong>
                ).
              </p>
              <hr />
              <FontAwesomeIcon pulse size="2x" icon={faSpinner} />
              <p className="mt-3 mb-0">
                <strong>Waiting for verification ...</strong>
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

EmailVerificationPage.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isUserEmailConfirmed: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  emailverificationpage: makeSelectEmailVerificationPage(),
  email: makeSelectEmail(),
  isUserEmailConfirmed: makeSelectIsEmailConfirmed(),
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

const withReducer = injectReducer({ key: 'emailVerificationPage', reducer });
const withSaga = injectSaga({ key: 'emailVerificationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmailVerificationPage);
