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
import JWTDecode from 'jwt-decode';
import Reaptcha from 'reaptcha';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setLoggedStatus, setUserUsername } from '../Auth/actions';
import { makeSelectIsLogged } from '../Auth/selectors';
import api from '../../services/api';

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
      serverMsgErr: null,
      recaptchaResponse: null,
    };
  }

  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  submitSignUp(values, formikActions) {
    const { email, username, password } = values;
    const { history, logInUser } = this.props;
    const { recaptchaResponse } = this.state;

    api
      .register(email, username, password, recaptchaResponse)
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
      });
  }

  render() {
    const { serverMsgErr } = this.state;
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
                  className={serverMsgErr ? '' : 'd-none'}
                >
                  <strong>{serverMsgErr}</strong>
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
              onSubmit={(values, actions) => {
                const { recaptchaResponse } = this.state;

                if (!recaptchaResponse) {
                  actions.setSubmitting(false);
                  return this.captcha.execute();
                }

                return this.submitSignUp(values, actions);
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
                  />
                  <Field
                    component={ReactstrapInput}
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    label="Username"
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
  history: PropTypes.object,
  logInUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    logInUser: tokens => {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      dispatch(setUserUsername(JWTDecode(tokens.access_token).user.username));
      dispatch(setLoggedStatus(true));
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
