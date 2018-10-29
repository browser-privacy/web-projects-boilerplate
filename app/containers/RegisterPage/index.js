/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Reaptcha from 'reaptcha';
import {
  makeSelectRegisterPage,
  makeSelectServerErrMsg,
  makeSelectRecaptchaResponse,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectIsLoggedIn } from '../Auth/selectors';
import {
  registerRequestAction,
  resetStateAction,
  setRecaptchaResponseAction,
} from './actions';

import config from '../../config';
const APP_CONFIG = config[process.env.NODE_ENV];

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.recaptcha = null;
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(resetStateAction());
  }

  render() {
    const {
      isLoggedIn,
      serverErrMsg,
      recaptchaResponse,
      onLoginFormSubmit,
      dispatch,
    } = this.props;

    if (isLoggedIn) return <Redirect to="/dashboard" />;

    return (
      <Container tag="main">
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Description of RegisterPage" />
        </Helmet>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Sign up</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    <Alert
                      color="danger"
                      role="alert"
                      className={serverErrMsg ? '' : 'd-none'}
                    >
                      <strong>{serverErrMsg}</strong>
                    </Alert>
                  </Col>
                </Row>

                <Formik
                  initialValues={{
                    email: '',
                    username: '',
                    password: '',
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email('Invalid email')
                      .required('Required'),
                    username: Yup.string().required('Required'),
                    password: Yup.string()
                      .min(3, 'Password must be at least 3 characters')
                      .required('Required'),
                  })}
                  onSubmit={(values, formik) => {
                    if (!recaptchaResponse) {
                      formik.setSubmitting(false);
                      return this.recaptcha.execute();
                    }
                    values.recaptchaResponse = recaptchaResponse;

                    return onLoginFormSubmit(values, formik, this.recaptcha);
                  }}
                >
                  {({ submitForm, isSubmitting }) => (
                    <Form>
                      <Field
                        component={ReactstrapInput}
                        name="email"
                        type="email"
                        placeholder="john@acme.com"
                        label="E-mail address"
                        autoComplete="email"
                      />
                      <Field
                        component={ReactstrapInput}
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        label="Username"
                        autoComplete="username"
                      />
                      <Field
                        component={ReactstrapInput}
                        name="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        autoComplete="new-password"
                      />

                      <div>
                        <Button
                          type="submit"
                          block
                          size="lg"
                          color="success"
                          disabled={isSubmitting}
                        >
                          <FontAwesomeIcon
                            pulse
                            icon={faSpinner}
                            className={isSubmitting ? 'mr-2' : 'd-none'}
                          />
                          Get started now
                        </Button>
                        <p className="mt-1 text-center text-muted small">
                          By signing up you agree to our{' '}
                          <a href="/legal/terms#tos" target="popup">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="/legal/terms#pp" target="popup">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                      <Reaptcha
                        // eslint-disable-next-line
                        ref={e => (this.recaptcha = e)}
                        sitekey={APP_CONFIG.RECAPTCHA_SITE_KEY}
                        onVerify={res => {
                          dispatch(setRecaptchaResponseAction(res));
                          submitForm();
                        }}
                        onExpire={() => {
                          dispatch(setRecaptchaResponseAction(''));
                          this.recaptcha.reset();
                        }}
                        onError={() => console.error(`Unable to load captcha.`)}
                        size="invisible"
                        theme="dark"
                      />
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <Link to="/auth/login">Already have an account? Log in</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

RegisterPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  serverErrMsg: PropTypes.string,
  recaptchaResponse: PropTypes.string,
  onLoginFormSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  serverErrMsg: makeSelectServerErrMsg(),
  recaptchaResponse: makeSelectRecaptchaResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginFormSubmit: (values, formik, recaptcha) =>
      dispatch(registerRequestAction(values, formik, recaptcha)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
