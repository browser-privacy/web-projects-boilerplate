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
  // Alert,
} from 'reactstrap';
import queryString from 'query-string';
// import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmailConfirmationPage, {
  makeSelectEmailConfirmationRequestStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { emailConfirmationRequestAction } from './actions';

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

    initEmailConfirmation(token);
  }

  render() {
    const { emailConfirmationRequestStatus } = this.props;

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
                <h3 className="mb-0">Email address verification</h3>
              </CardHeader>
              <CardBody className="text-center">
                <Row hidden={!(emailConfirmationRequestStatus === 'LOADING')}>
                  <Col>LOADING</Col>
                </Row>
                <Row hidden={!(emailConfirmationRequestStatus === 'OK')}>
                  <Col>OK</Col>
                </Row>
                <Row hidden={!(emailConfirmationRequestStatus === 'ERR')}>
                  <Col>UNABLE_TO_CONFIRM_TOKEN</Col>
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
  emailConfirmationRequestStatus: PropTypes.string,
  initEmailConfirmation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  emailconfirmationpage: makeSelectEmailConfirmationPage(),
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
