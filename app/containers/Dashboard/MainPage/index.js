/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import api from '../../../services/api';

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>MainPage</title>
          <meta name="description" content="Description of MainPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <button
          type="submit"
          onClick={() => {
            api
              .test()
              .then(res => {
                console.log('A OK!');
                console.log(res);
              })
              .catch(err => {
                console.log('A ERROR!');
                console.log(err);
              });
            api
              .testFoo()
              .then(res => {
                console.log('B OK!');
                console.log(res);
              })
              .catch(err => {
                console.log('B ERROR!');
                console.log(err);
              });
          }}
        >
          GO!
        </button>
      </div>
    );
  }
}

MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
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
