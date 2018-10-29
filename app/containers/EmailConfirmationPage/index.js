/**
 *
 * EmailConfirmationPage
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
  // Button,
  Alert,
} from 'reactstrap';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmailConfirmationPage, {
  makeSelectEmailConfirmationRequestStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { emailConfirmationRequestAction } from './actions';
import { makeSelectIsEmailConfirmed } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class EmailConfirmationPage extends React.PureComponent {
  constructor(props) {
    super(props);

    const { location } = this.props;

    const urlParams = queryString.parse(location.search);
    const { token } = urlParams;

    this.state = {
      token: token || null,
    };
  }

  componentDidMount() {
    const { token } = this.state;
    const { initEmailConfirmation } = this.props;

    return initEmailConfirmation(token);
  }

  render() {
    const { isUserEmailConfirmed, emailConfirmationRequestStatus } = this.props;

    if (isUserEmailConfirmed) return <Redirect to="/dashboard" />;

    return (
      <Container tag="main">
        <Helmet>
          <title>EmailConfirmationPage</title>
          <meta
            name="description"
            content="Description of EmailConfirmationPage"
          />
        </Helmet>
        <Row>
          <Col md={{ size: 12 }}>
            <Card>
              <CardHeader>
                <h2
                  className="mb-0"
                  hidden={!(emailConfirmationRequestStatus === 'LOADING')}
                >
                  Verifying e-mail address ...
                </h2>
                <h2
                  className="mb-0 text-success"
                  hidden={!(emailConfirmationRequestStatus === 'OK')}
                >
                  Email address is now verified.
                </h2>
                <h2
                  className="mb-0 text-danger"
                  hidden={!(emailConfirmationRequestStatus === 'ERR')}
                >
                  Oops, some error ocurred.
                </h2>
              </CardHeader>
              <CardBody className="text-center">
                <Row hidden={!(emailConfirmationRequestStatus === 'LOADING')}>
                  <Col>
                    <FontAwesomeIcon pulse size="5x" icon={faSpinner} />
                  </Col>
                </Row>
                <Row hidden={!(emailConfirmationRequestStatus === 'OK')}>
                  <Col>
                    <Alert color="success">
                      Thanks for verify your e-mail address, now you can{' '}
                      <Link to="/dashboard">
                        <strong>go to dashboard</strong>
                      </Link>
                      .
                    </Alert>
                  </Col>
                </Row>
                <Row hidden={!(emailConfirmationRequestStatus === 'ERR')}>
                  <Col>
                    <Alert color="danger">
                      We weren&apos;t able to verify your e-mail address. Please
                      try it again if you think it is an error.
                    </Alert>
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

EmailConfirmationPage.propTypes = {
  location: PropTypes.object,
  isUserEmailConfirmed: PropTypes.bool,
  emailConfirmationRequestStatus: PropTypes.string,
  initEmailConfirmation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  emailconfirmationpage: makeSelectEmailConfirmationPage(),
  isUserEmailConfirmed: makeSelectIsEmailConfirmed(),
  emailConfirmationRequestStatus: makeSelectEmailConfirmationRequestStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    initEmailConfirmation: token =>
      dispatch(emailConfirmationRequestAction(token)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'emailConfirmationPage', reducer });
const withSaga = injectSaga({ key: 'emailConfirmationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmailConfirmationPage);
