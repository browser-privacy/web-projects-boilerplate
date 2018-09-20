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
import { Container, Button, Row, Col } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import JWTDecode from 'jwt-decode';
import ReCAPTCHA from 'react-google-recaptcha';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  setLoggedStatus,
  setAccessToken,
  setRefreshToken,
  setUserUsername,
} from '../Auth/actions';
import { makeSelectIsLogged } from '../Auth/selectors';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Required'),
});

const recaptchaRef = React.createRef();

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  submitSignUp(values, actions) {
    const { email, username, password } = values;

    actions.setSubmitting(false);
    actions.setFieldError('email', 'woah');

    console.log('ready');
    // recaptchaRef.current.getValue()

    /**
     * 1. Submit data to Register API
     * 2. Handle response
     * 3. If errors then throw out validation errors else log in user
     */
  }

  render() {
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
              </Col>
            </Row>

            <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={() => recaptchaRef.current.execute()}
            >
              {({ handleBlur, handleChange, isSubmitting }) => (
                <Form>
                  <Field
                    component={ReactstrapInput}
                    name="email"
                    type="email"
                    placeholder="john@acme.com"
                    label="E-mail address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    component={ReactstrapInput}
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    label="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    component={ReactstrapInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF"
                    theme="dark"
                    badge="inline"
                    onChange={this.submitSignUp}
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
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    logUser: tokens => {
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

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
