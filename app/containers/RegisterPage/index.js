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
import { Redirect } from 'react-router';
import { Container, Button, Row, Col, Alert } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Reaptcha from 'reaptcha';
import { makeSelectRegisterPage, makeSelectServerErrMsg } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectIsLogged } from '../Auth/selectors';
import { registerRequestAction } from './actions';

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

    this.captcha = null;
    this.state = {
      recaptchaResponse: null,
    };
  }

  submitSignUp(values) {
    console.log(values);
    console.log('GOT IT');

    /* AuthApi.register(email, username, password, recaptchaResponse)
      .then(res => {
        const tokens = res.data;

        if (!tokens.access_token && !tokens.refresh_token) {
          this.setState({ recaptchaResponse: null });
          this.captcha.reset();
          this.setState({
            serverMsgErr: 'An error ocurred, please try again.',
          });
          return formikActions.setSubmitting(false);
        }

        logInUser(tokens);
        return history.push('/dashboard/index');
      })
      .catch(err => {
        if (err.status === 400)
          return this.setState({
            serverMsgErr: `E-mail address or username already exists. Please try again.`,
          });

        this.setState({ serverMsgErr: `Server error: ${err.message}` });

        this.captcha.reset();
        return formikActions.setSubmitting(false);
      }); */
  }

  render() {
    const { isLogged, serverErrMsg, onLoginFormSubmit } = this.props;

    if (isLogged) {
      return <Redirect to="/dashboard/index" push />;
    }

    return (
      <div>
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Description of RegisterPage" />
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
                <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
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
              onSubmit={(values, formikActions) => {
                const { recaptchaResponse } = this.state;

                if (!recaptchaResponse) {
                  formikActions.setSubmitting(false);
                  return this.captcha.execute();
                }

                return onLoginFormSubmit(values, formikActions);
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
                      color="primary"
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon
                        pulse
                        icon={faSpinner}
                        className={isSubmitting ? 'mr-2' : 'd-none'}
                      />
                      Sign up to start
                    </Button>
                  </div>
                  <Reaptcha
                    // eslint-disable-next-line
                    ref={e => (this.captcha = e)}
                    sitekey="6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF"
                    onVerify={res => {
                      this.setState({ recaptchaResponse: res });
                      submitForm();
                    }}
                    onError={() => this.setState({ recaptchaResponse: null })}
                    onExpire={() => this.setState({ recaptchaResponse: null })}
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
      </div>
    );
  }
}

RegisterPage.propTypes = {
  isLogged: PropTypes.bool,
  serverErrMsg: PropTypes.string,
  onLoginFormSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
  isLogged: makeSelectIsLogged(),
  serverErrMsg: makeSelectServerErrMsg(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginFormSubmit: (values, formikActions) => {
      dispatch(registerRequestAction(values, formikActions));
    },
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
