/**
 *
 * EmailVerificationPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmailVerificationPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class EmailVerificationPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>EmailVerificationPage</title>
          <meta
            name="description"
            content="Description of EmailVerificationPage"
          />
        </Helmet>
        <h1>Verify</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  emailverificationpage: makeSelectEmailVerificationPage(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'emailVerificationPage', reducer });
const withSaga = injectSaga({ key: 'emailVerificationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmailVerificationPage);
