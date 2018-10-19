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
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Alert } from 'reactstrap';
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
import { makeSelectIsLogged } from '../Auth/selectors';
import {
  registerRequestAction,
  resetStateAction,
  setRecaptchaResponseAction,
} from './actions';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Required'),
});

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.recaptcha = null;
  }

  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetStateAction());
  }

  render() {
    const {
      serverErrMsg,
      recaptchaResponse,
      onLoginFormSubmit,
      dispatch,
    } = this.props;

    return (
      <article>
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Description of RegisterPage" />
        </Helmet>
        <Container>
          <div className="form-page">
            <Row>
              <Col className="text-center">
                <img
                  className="mb-4"
                  src="/icon.png"
                  alt="app logo"
                  width="72"
                  height="72"
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                {' '}
                <h1 className="h3 mb-3 font-weight-normal">
                  Get started for free
                </h1>
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
              validationSchema={SignupSchema}
              onSubmit={(values, formik) => {
                if (!recaptchaResponse) {
                  formik.setSubmitting(false);
                  return this.recaptcha.execute();
                }
                values.recaptchaResponse = recaptchaResponse;

                return onLoginFormSubmit(values, formik, this.recaptcha);
              }}
            >
              {({ submitForm, isSubmitting, touched }) => (
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
                      color="primary"
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
                    sitekey="6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF"
                    onVerify={res => {
                      dispatch(setRecaptchaResponseAction(res));
                      submitForm();
                    }}
                    onExpire={() => {
                      dispatch(setRecaptchaResponseAction(''));
                      this.recaptcha.reset();
                    }}
                    onError={() => console.log(`Unable to load captcha.`)}
                    size="invisible"
                    theme="dark"
                    badge="inline"
                  />
                </Form>
              )}
            </Formik>

            <p className="mt-5 mb-3 text-center">
              <Link to="/auth/login">Already have an account? Log in</Link>
            </p>
          </div>
        </Container>
      </article>
    );
  }
}

RegisterPage.propTypes = {
  isLogged: PropTypes.bool,
  serverErrMsg: PropTypes.string,
  recaptchaResponse: PropTypes.string,
  onLoginFormSubmit: PropTypes.func,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
  isLogged: makeSelectIsLogged(),
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
