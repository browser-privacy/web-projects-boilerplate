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
import {
  Container,
  Form,
  Alert,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { renderField, fieldValidations } from 'utils/reduxforms';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ReCAPTCHA from 'react-google-recaptcha';
import JWTDecode from 'jwt-decode';
import api from '../../services/api';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  setLoggedStatus,
  setAccessToken,
  setRefreshToken,
  setUserUsername,
} from '../Auth/actions';

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recaptcha: '',
      modal: false,
      modalCb: null,
    };

    this.submitForm = this.submitForm.bind(this);
    this.initCaptcha = this.initCaptcha.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  submitForm(values) {
    return new Promise((resolve, reject) => {
      this.initCaptcha().then(() => {
        const { email, username, password } = values;
        const { recaptcha } = this.state;

        if (!recaptcha)
          return reject(
            new SubmissionError({
              _error: 'Google reCAPTCHA is required',
            }),
          );

        return api
          .register(email, username, password, recaptcha)
          .then(res => {
            const { history, login } = this.props;
            const loginTokens = res.data;

            login(loginTokens);
            history.push('/dashboard/index');
          })
          .catch(err => {
            const errData = err.data.message;

            if (errData.message === 'recaptcha_error')
              return reject(
                new SubmissionError({
                  _error: 'Google reCAPTCHA error. Please try again.',
                }),
              );

            if (err.status === 400) {
              if (errData.name === 'validationError') {
                const submissionError = {
                  _error: 'Registration failed',
                };

                Object.keys(errData.errors).forEach(key => {
                  let validationErrMessage = null;

                  if (errData.errors[key].kind === 'mongoose-unique-validator')
                    validationErrMessage = 'Already exists';

                  submissionError[key] = validationErrMessage;
                });

                return reject(new SubmissionError(submissionError));
              }
            }

            return reject(
              new SubmissionError({
                _error: 'Server error. Please try again.',
              }),
            );
          });
      });
    });
  }

  toggle() {
    const { modal } = this.state;

    this.setState({
      modal: !modal,
    });
  }

  initCaptcha() {
    const globalthis = this;

    return new Promise((resolve, reject) => {
      function onReCaptchaChange(res) {
        if (!res) return reject();

        globalthis.setState({
          recaptcha: res,
        });

        globalthis.toggle();

        return resolve();
      }

      globalthis.setState({
        modalCb: onReCaptchaChange,
      });

      this.toggle();
    });
  }

  render() {
    const { modal, modalCb } = this.state;
    const { error, handleSubmit, submitting } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Description of RegisterPage" />
          <script src="https://www.google.com/recaptcha/api.js" async defer />
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

            <Alert
              color="danger"
              role="alert"
              className={error && !submitting ? 'text-center' : 'd-none'}
            >
              <strong>{error}</strong>
            </Alert>

            <Form onSubmit={handleSubmit(this.submitForm)}>
              <Field
                name="email"
                type="email"
                component={renderField}
                placeholder="Email"
                validate={[fieldValidations.required, fieldValidations.email]}
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                placeholder="Create Password"
                validate={fieldValidations.required}
              />
              <Field
                name="username"
                type="text"
                component={renderField}
                placeholder="Username"
                validate={[
                  fieldValidations.required,
                  fieldValidations.alphaNumeric,
                  fieldValidations.noWhiteSpaces,
                ]}
              />
              <div>
                <Button
                  type="submit"
                  disabled={submitting}
                  block
                  size="lg"
                  color="primary"
                >
                  <FontAwesomeIcon
                    pulse
                    icon={faSpinner}
                    className={submitting ? 'mr-2' : 'd-none'}
                  />
                  Sign up to start
                </Button>
              </div>
            </Form>
            <p className="mt-5 mb-3 text-center">
              <Link to="/auth/login">Already have an account? Log in</Link>
            </p>
          </div>
          <Modal isOpen={modal} className="modal-md">
            <ModalHeader className="register-page-recaptcha-modal-header">
              Please verify that you are not a robot
            </ModalHeader>
            <ModalBody>
              <Container>
                <Row>
                  <Col className="register-page-recaptcha-col text-center">
                    <ReCAPTCHA
                      ref={c => {
                        this.recaptcha = c;
                      }}
                      sitekey="6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF"
                      onChange={modalCb}
                    />
                  </Col>
                </Row>
              </Container>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  login: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: tokens => {
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
  reduxForm({
    form: 'registration',
  }),
)(RegisterPage);
