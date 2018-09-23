/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import JWTDecode from 'jwt-decode';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import { FormattedMessage } from 'react-intl';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoginPage } from './selectors';
import { makeSelectIsLogged } from '../Auth/selectors';
import {
  setLoggedStatus,
  setAccessToken,
  setRefreshToken,
  setUserUsername,
} from '../Auth/actions';
import messages from './messages';
import api from '../../services/api';

const LoginSchema = Yup.object().shape({
  userIdentifier: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formMsg: {
        color: '',
        text: '',
      },
    };

    this.submitLogInRequest = this.submitLogInRequest.bind(this);
  }

  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  submitLogInRequest(values, formikActions) {
    const { userIdentifier, password } = values;
    const { history, logInUser } = this.props;

    this.setState({
      formMsg: {
        color: '',
        text: '',
      },
    });

    api
      .login(userIdentifier, password)
      .then(loginTokens => {
        this.setState({
          formMsg: {
            color: 'success',
            text: 'Redirecting to dashboard...',
          },
        });

        setTimeout(() => {
          logInUser(loginTokens);
          history.push('/dashboard/index');
        }, 500);
      })
      .catch(err => {
        let formMsgText;

        if (err.status === 401) {
          formMsgText = 'Invalid credentials';
        } else {
          formMsgText = `Server error: "${
            err.message
          }". We have been notified about this error, our devs will fix it shortly.`;
        }

        this.setState({
          formMsg: {
            color: 'danger',
            text: formMsgText,
          },
        });

        formikActions.setSubmitting(false);
      });
  }

  render() {
    const { formMsg } = this.state;

    return (
      <div>
        <Helmet>
          <title>Sign in</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <Container className="auth-container">
          <div className="form-page">
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
                  color={formMsg.color}
                  role="alert"
                  className={formMsg.text ? '' : 'd-none'}
                >
                  <strong>{formMsg.text}</strong>
                </Alert>
              </Col>
            </Row>

            <Formik
              initialValues={{
                userIdentifier: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={this.submitLogInRequest}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    component={ReactstrapInput}
                    name="userIdentifier"
                    type="userIdentifier"
                    placeholder="john@acme.com"
                    label="E-mail address"
                  />
                  <Field
                    component={ReactstrapInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                  />
                  <div>
                    <Button
                      type="submit"
                      block
                      size="lg"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon
                        pulse
                        icon={faSpinner}
                        className={isSubmitting ? 'mr-2' : 'd-none'}
                      />
                      Log in to access
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

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
  isLogged: PropTypes.bool,
  history: PropTypes.object,
  logInUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    logInUser: tokens => {
      dispatch(setAccessToken(tokens.access_token));
      dispatch(setRefreshToken(tokens.refresh_token));
      dispatch(setUserUsername(JWTDecode(tokens.access_token).username));
      dispatch(setLoggedStatus(true));
    },
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
