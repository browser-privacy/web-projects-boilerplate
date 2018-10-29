/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { initLoadAction } from './actions';
import { makeSelectIsEmailConfirmed } from '../../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(initLoadAction());
  }

  render() {
    const { isEmailConfirmed } = this.props;

    if (!isEmailConfirmed)
      return <Redirect to="/dashboard/email_verification" />;

    return (
      <main>
        <Helmet>
          <title>MainPage</title>
          <meta name="description" content="Description of MainPage" />
        </Helmet>
        <h1>vamoss</h1>
      </main>
    );
  }
}

MainPage.propTypes = {
  isEmailConfirmed: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
  isEmailConfirmed: makeSelectIsEmailConfirmed(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainPage);
