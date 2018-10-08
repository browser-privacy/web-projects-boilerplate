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
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import reducer from './reducer';
import saga from './saga';
import { loginRequestAction, resetStateAction } from './actions';
import { makeSelectLoginPage, makeSelectFormMsg } from './selectors';
import { makeSelectIsLogged } from '../Auth/selectors';

const LoginSchema = Yup.object().shape({
  userIdentifier: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  componentDidMount() {
    const { history, isLogged } = this.props;

    if (isLogged) history.push('/dashboard/index');
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetStateAction());
  }

  render() {
    const { formMsg, onLoginFormSubmit } = this.props;

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
                <h1 className="h3 mb-3 font-weight-normal">Authentication</h1>
                {formMsg && (
                  <Alert color={formMsg.color} role="alert">
                    <strong>{formMsg.text}</strong>
                  </Alert>
                )}
              </Col>
            </Row>

            <Formik
              initialValues={{
                userIdentifier: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={onLoginFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    component={ReactstrapInput}
                    name="userIdentifier"
                    type="userIdentifier"
                    placeholder="john@acme.com"
                    label="E-mail address"
                    autoComplete="e-mail"
                  />
                  <Field
                    component={ReactstrapInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    autoComplete="password"
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

            <Link to="/auth/forgot_password">
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
  formMsg: PropTypes.object,
  isLogged: PropTypes.bool,
  onLoginFormSubmit: PropTypes.func,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  formMsg: makeSelectFormMsg(),
  isLogged: makeSelectIsLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginFormSubmit: (values, formikActions) =>
      dispatch(loginRequestAction(values, formikActions)),
    dispatch,
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
