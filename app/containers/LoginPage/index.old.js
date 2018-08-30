/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loginRequestAction, onInputChangeAction } from './actions';
import {
  makeSelectLoginPage,
  makeSelectSendingRequest,
  makeSelectIdentifier,
  makeSelectPassword,
  makeSelectFormMessage,
} from './selectors';

import { makeSelectIsLogged } from '../Auth/selectors';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  render() {
    const {
      sendingRequest,
      identifier,
      password,
      formMessage,
      onSubmitForm,
      onInputChange,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sign in</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <Container className="auth-container">
          <div className="form-page">
            <form onSubmit={onSubmitForm}>
              <Row>
                <Col className="text-center">
                  <img
                    className="mb-4"
                    src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg"
                    alt=""
                    width="72"
                    height="72"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  {' '}
                  <h1 className="h3 mb-3 font-weight-normal">
                    <FormattedMessage {...messages.header} />
                  </h1>
                  <Alert
                    color={formMessage.color}
                    role="alert"
                    className={formMessage.show ? '' : 'd-none'}
                  >
                    <strong>{formMessage.text}</strong>
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="identifier" className="sr-only">
                    Email address or nickname
                  </label>
                  <input
                    type="text"
                    name="identifier"
                    className="form-control"
                    placeholder="Email address or username"
                    required
                    value={identifier}
                    onChange={e => onInputChange(e)}
                  />
                  <label htmlFor="inputPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => onInputChange(e)}
                  />
                </Col>
              </Row>
              <Button
                size="lg"
                color="primary"
                block
                type="submit"
                className={sendingRequest ? 'disabled' : ''}
              >
                <FontAwesomeIcon
                  pulse
                  icon={faSpinner}
                  className={sendingRequest ? 'mr-2' : 'd-none'}
                />
                <span>Sign in</span>
              </Button>
            </form>
            <Link to="/auth/reset">
              <Button size="sm" color="secondary" block className="mt-2">
                Forgot password?
              </Button>
            </Link>
            <p className="mt-5 mb-3 text-center">
              <Link to="/auth/register">
                Don&#39;t have an account? Sign up
              </Link>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

LoginPage.propTypes = {
  sendingRequest: PropTypes.bool,
  identifier: PropTypes.string,
  password: PropTypes.string,
  formMessage: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onInputChange: PropTypes.func,
  onCheckboxChange: PropTypes.func,
  isLogged: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  sendingRequest: makeSelectSendingRequest(),
  identifier: makeSelectIdentifier(),
  password: makeSelectPassword(),
  formMessage: makeSelectFormMessage(),
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginRequestAction());
    },
    onInputChange: evt =>
      dispatch(
        onInputChangeAction({
          name: evt.target.name,
          value: evt.target.value,
        }),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
