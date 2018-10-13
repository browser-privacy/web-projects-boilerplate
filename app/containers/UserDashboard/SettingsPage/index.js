/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SettingsPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>SettingsPage</title>
          <meta name="description" content="Description of SettingsPage" />
        </Helmet>

        <h1>wowo</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  settingspage: makeSelectSettingsPage(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
