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
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import reducer from './reducer';
import saga from './saga';
import { loginRequestAction, resetStateAction } from './actions';
import { makeSelectLoginPage, makeSelectFormMsg } from './selectors';
import { makeSelectIsLogged } from '../Auth/selectors';

const Login = styled(Card)`
  width: 100%;
  max-width: 520px;
  padding: 15px;
  margin: auto;
`;
const LoginContainer = styled(CardBody)``;
const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  line-height: 40px;
  text-align: left;
`;
const LoginSubtitle = styled.span`
  padding-bottom: 422px;
  line-height: 24px;
  letter-spacing: normal;
`;
const LoginForm = styled(Form)`
  width: 100%;
  margin-top: 20px;
`;
const ForgotPasswordContainer = styled.div`
  font-size: 12px;
  text-align: right;
  margin-top: 7px;
  margin-bottom: 7px;
`;

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
    const { formMsg, onLoginSubmit } = this.props;

    return (
      <main role="main">
        <Helmet>
          <title>Log in</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>

        <Container className="">
          <Login className="">
            <LoginContainer>
              <Container>
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
                  <Col>
                    <LoginTitle>Log in to account</LoginTitle>
                    <LoginSubtitle>Enter your details below</LoginSubtitle>
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
                      validationSchema={LoginSchema}
                      onSubmit={onLoginSubmit}
                    >
                      {({ isSubmitting }) => (
                        <LoginForm>
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <span className="input-group-text" id="addon1">
                                <FontAwesomeIcon icon={faIdCard} fixedWidth />
                              </span>
                            </InputGroupAddon>
                            <Field
                              name="userIdentifier"
                              type="text"
                              placeholder="Email or username"
                              autoComplete="e-mail"
                              aria-label="User identifier"
                              aria-describedby="addon1"
                              className="form-control"
                            />
                          </InputGroup>
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <span className="input-group-text" id="addon2">
                                <FontAwesomeIcon icon={faLock} fixedWidth />
                              </span>
                            </InputGroupAddon>
                            <Field
                              name="password"
                              type="password"
                              placeholder="Password"
                              autoComplete="password"
                              aria-label="User password"
                              aria-describedby="addon2"
                              className="form-control"
                            />
                          </InputGroup>
                          <ForgotPasswordContainer>
                            <Link
                              to="/auth/forgot_password"
                              className="text-muted"
                            >
                              Forgot password?
                            </Link>
                          </ForgotPasswordContainer>
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
                              Log In
                            </Button>
                          </div>
                        </LoginForm>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </Container>
            </LoginContainer>
            <Link to="/auth/register">Don&#39;t have an account? Sign up</Link>
          </Login>
        </Container>
      </main>
    );
  }
}

LoginPage.propTypes = {
  formMsg: PropTypes.object,
  isLogged: PropTypes.bool,
  onLoginSubmit: PropTypes.func,
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
    onLoginSubmit: (values, formikActions) =>
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
