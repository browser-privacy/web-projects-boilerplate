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
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Alert,
} from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import styled from 'styled-components';
import reducer from './reducer';
import saga from './saga';
import { loginRequestAction, resetStateAction } from './actions';
import { makeSelectLoginPage, makeSelectFormMsg } from './selectors';
import { makeSelectIsLoggedIn } from '../Auth/selectors';

const ForgotPasswordContainer = styled.div`
  margin-top: -10px;
  font-size: 12px;
  line-height: 18px;
`;

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetStateAction());
  }

  render() {
    const { isLoggedIn, formMsg, onLoginFormSubmit } = this.props;

    if (isLoggedIn) return <Redirect to="/dashboard" />;

    return (
      <Container tag="main">
        <Helmet>
          <title>Sign in</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>

        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Log in</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    {formMsg && (
                      <Alert color={formMsg.color} role="alert">
                        <strong>{formMsg.text}</strong>
                      </Alert>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Formik
                      initialValues={{
                        userIdentifier: '',
                        password: '',
                      }}
                      validationSchema={Yup.object().shape({
                        userIdentifier: Yup.string().required('Required'),
                        password: Yup.string().required('Required'),
                      })}
                      onSubmit={onLoginFormSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <Field
                            component={ReactstrapInput}
                            name="userIdentifier"
                            type="userIdentifier"
                            label="Email address or username"
                            autoComplete="e-mail"
                          />
                          <Field
                            component={ReactstrapInput}
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="password"
                          />
                          <ForgotPasswordContainer className="text-right mb-3">
                            <Link
                              to="/auth/forgot_password"
                              className="text-muted"
                            >
                              forgot password?
                            </Link>
                          </ForgotPasswordContainer>
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
                              Log in to access
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <Link to="/register">Don&#39;t have an account? Sign up</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  formMsg: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  onLoginFormSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  formMsg: makeSelectFormMsg(),
  isLoggedIn: makeSelectIsLoggedIn(),
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
