/**
 *
 * RouteAnalytics
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { track } from '../../api/vendors/analytics';

/* eslint-disable react/prefer-stateless-function */
class RouteAnalytics extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;

    track(`Route ${location.pathname}`);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

RouteAnalytics.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

export default RouteAnalytics;
