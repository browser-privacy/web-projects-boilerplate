/**
 *
 * ContactPage
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
import Reaptcha from 'reaptcha';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  contactRequestAction,
  setRecaptchaResponseAction,
  resetStateAction,
} from './actions';
import makeSelectContactPage, {
  makeSelectRecaptchaResponse,
  makeSelectContactRequestStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ContactPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.recaptcha = null;
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetStateAction());
  }

  render() {
    const {
      onContactFormSubmit,
      contactRequestStatus,
      recaptchaResponse,
      dispatch,
    } = this.props;

    return (
      <Container tag="main">
        <Helmet>
          <title>ContactPage</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>

        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Contact form</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    {contactRequestStatus && (
                      <Alert
                        color={
                          contactRequestStatus === 'OK' ? 'success' : 'danger'
                        }
                        role="alert"
                      >
                        <strong>
                          {contactRequestStatus === 'OK'
                            ? 'Thank you for your message. We will respond as soon as possible.'
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
                        name: '',
                        email: '',
                        message: '',
                      }}
                      validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required'),
                        email: Yup.string()
                          .email('Invalid email')
                          .required('Required'),
                        message: Yup.string().required('Required'),
                      })}
                      onSubmit={(values, formik) => {
                        if (!recaptchaResponse) {
                          formik.setSubmitting(false);
                          return this.recaptcha.execute();
                        }
                        values.recaptchaResponse = recaptchaResponse;

                        return onContactFormSubmit(
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
                            name="name"
                            type="text"
                            label="Your name"
                            autoComplete="name"
                          />
                          <Field
                            component={ReactstrapInput}
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="e-mail"
                          />
                          <Field
                            component={ReactstrapInput}
                            name="message"
                            type="textarea"
                            label="How can we help?"
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
                              Get in touch
                            </Button>
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

ContactPage.propTypes = {
  contactRequestStatus: PropTypes.string,
  recaptchaResponse: PropTypes.string,
  onContactFormSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contactRequestStatus: makeSelectContactRequestStatus(),
  recaptchaResponse: makeSelectRecaptchaResponse(),
  contactpage: makeSelectContactPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onContactFormSubmit: (values, formikActions, recaptcha) =>
      dispatch(contactRequestAction(values, formikActions, recaptcha)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'contactPage', reducer });
const withSaga = injectSaga({ key: 'contactPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ContactPage);
