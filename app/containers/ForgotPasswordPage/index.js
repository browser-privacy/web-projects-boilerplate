/**
 *
 * ForgotPasswordPage
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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import styled from 'styled-components';
import Reaptcha from 'reaptcha';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForgotPasswordPage, {
  makeSelectForgotPasswordRequestStatus,
  makeSelectRecaptchaResponse,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  forgotPasswordRequestAction,
  setRecaptchaResponseAction,
  resetStateAction,
} from './actions';

import config from '../../config';
const APP_CONFIG = config[process.env.NODE_ENV];

const PasswordResetText = styled('div')`
  margin-top: -15px;
  margin-bottom: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
export class ForgotPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.recaptcha = null;
  }

  componentDidMount() {
    const { history, isLoggedIn } = this.props;

    if (isLoggedIn) history.push('/dashboard');
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetStateAction());
  }

  render() {
    const {
      forgotPasswordRequestStatus,
      recaptchaResponse,
      onForgotPasswordSubmit,
      dispatch,
    } = this.props;

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
                <h3 className="mb-0">Password reset</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    {forgotPasswordRequestStatus && (
                      <Alert
                        color={
                          forgotPasswordRequestStatus === 'OK'
                            ? 'success'
                            : 'danger'
                        }
                        role="alert"
                      >
                        <strong>
                          {forgotPasswordRequestStatus === 'OK'
                            ? `Account recovery email sent.\n\nIf you don't see any email in your inbox within 2 minutes, look for it in your spam mail folder. If you find it there, please mark it as "Not Spam".`
                            : 'Some error occurred, please try it again.'}
                        </strong>
                      </Alert>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Formik
                      initialValues={{
                        email: '',
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email('Invalid email')
                          .required('Required'),
                      })}
                      onSubmit={(values, formik) => {
                        if (!recaptchaResponse) {
                          formik.setSubmitting(false);
                          return this.recaptcha.execute();
                        }
                        values.recaptchaResponse = recaptchaResponse;

                        return onForgotPasswordSubmit(
                          values,
                          formik,
                          this.recaptcha,
                        );
                      }}
                    >
                      {({ submitForm, isSubmitting }) => (
                        <Form>
                          <Field
                            component={ReactstrapInput}
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                          />
                          <PasswordResetText>
                            <small className="text-muted">
                              Password reset instructions will be sent to this
                              email address.
                            </small>
                          </PasswordResetText>
                          <Row className="flex-nowrap">
                            <Col
                              md="6"
                              className="align-self-center float-left"
                            >
                              <Link to="/auth/login">
                                <FontAwesomeIcon
                                  icon={faChevronLeft}
                                  size="lg"
                                />
                                <span className="ml-2">Back to Login</span>
                              </Link>
                            </Col>
                            <Col md="6">
                              <Button
                                type="submit"
                                size="lg"
                                color="success"
                                disabled={isSubmitting}
                                className="float-right"
                              >
                                <FontAwesomeIcon
                                  pulse
                                  icon={faSpinner}
                                  className={isSubmitting ? 'mr-2' : 'd-none'}
                                />
                                Reset
                              </Button>
                            </Col>
                          </Row>
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
                            onError={() =>
                              console.log(`Unable to load captcha.`)
                            }
                            size="invisible"
                          />
                        </Form>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

ForgotPasswordPage.propTypes = {
  forgotPasswordRequestStatus: PropTypes.string,
  recaptchaResponse: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  onForgotPasswordSubmit: PropTypes.func,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  forgotPasswordRequestStatus: makeSelectForgotPasswordRequestStatus(),
  recaptchaResponse: makeSelectRecaptchaResponse(),
  forgotpasswordpage: makeSelectForgotPasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onForgotPasswordSubmit: (values, formikActions, recaptcha) =>
      dispatch(forgotPasswordRequestAction(values, formikActions, recaptcha)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPasswordPage', reducer });
const withSaga = injectSaga({ key: 'forgotPasswordPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPasswordPage);
