/**
 *
 * SupportPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSupportPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SupportPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>SupportPage</title>
          <meta name="description" content="Description of SupportPage" />
        </Helmet>
        Foo 1
      </article>
    );
  }
}

SupportPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  supportpage: makeSelectSupportPage(),
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

const withReducer = injectReducer({ key: 'supportPage', reducer });
const withSaga = injectSaga({ key: 'supportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SupportPage);
