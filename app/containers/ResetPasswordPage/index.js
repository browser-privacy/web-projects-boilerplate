/**
 *
 * ResetPasswordPage
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from 'reactstrap-formik';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResetPasswordPage, {
  makeSelectResetPasswordRequestStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetPasswordRequestAction, resetStateAction } from './actions';
import { makeSelectIsLoggedIn } from '../Auth/selectors';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);

    const { location } = this.props;

    const urlParams = queryString.parse(location.search);
    const { token } = urlParams;

    this.state = {
      gotTokenFromUrl: token || '',
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(resetStateAction());
  }

  render() {
    const { gotTokenFromUrl } = this.state;
    const {
      isLoggedIn,
      resetPasswordSubmit,
      resetPasswordRequestStatus,
    } = this.props;

    if (isLoggedIn) return <Redirect to="/dashboard" />;

    return (
      <Container tag="main">
        <Helmet>
          <title>ResetPasswordPage</title>
          <meta name="description" content="Description of ResetPasswordPage" />
        </Helmet>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Reset password</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    {resetPasswordRequestStatus && (
                      <Alert
                        color={
                          resetPasswordRequestStatus === 'OK'
                            ? 'success'
                            : 'danger'
                        }
                        role="alert"
                      >
                        <strong>
                          {resetPasswordRequestStatus === 'OK'
                            ? `Your password has been reset successfully.`
                            : 'Some error occurred, please try it again.'}
                        </strong>
                      </Alert>
                    )}
                  </Col>
                </Row>
                <Row hidden={resetPasswordRequestStatus === 'OK'}>
                  <Col>
                    <Formik
                      initialValues={{
                        token: gotTokenFromUrl,
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={Yup.object().shape({
                        token: Yup.string().required('Required'),
                        password: Yup.string()
                          .min(3, 'Password must be at least 3 characters')
                          .required('Required'),
                        confirmPassword: Yup.string()
                          .oneOf([Yup.ref('password')], 'Password must match')
                          .required('Required'),
                      })}
                      onSubmit={resetPasswordSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div hidden={gotTokenFromUrl}>
                            <Field
                              component={ReactstrapInput}
                              name="token"
                              type="text"
                              label="Reset token"
                              placeholder="(check your email inbox)"
                            />
                          </div>
                          <Field
                            component={ReactstrapInput}
                            name="password"
                            type="password"
                            label="New password"
                            autoComplete="password"
                          />
                          <Field
                            component={ReactstrapInput}
                            name="confirmPassword"
                            type="password"
                            label="Confirm password"
                            autoComplete="off"
                            autofill="off"
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
                              Reset
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                </Row>
                <Row hidden={resetPasswordRequestStatus !== 'OK'}>
                  <Col>
                    <Link to="/auth/login">
                      <Button type="button" block size="lg" color="primary">
                        Now you can log in
                      </Button>
                    </Link>
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

ResetPasswordPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  resetPasswordRequestStatus: PropTypes.string,
  location: PropTypes.object,
  resetPasswordSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ResetPasswordPage: makeSelectResetPasswordPage(),
  isLoggedIn: makeSelectIsLoggedIn(),
  resetPasswordRequestStatus: makeSelectResetPasswordRequestStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordSubmit: (values, formikActions) =>
      dispatch(resetPasswordRequestAction(values, formikActions)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ResetPasswordPage', reducer });
const withSaga = injectSaga({ key: 'ResetPasswordPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPasswordPage);
